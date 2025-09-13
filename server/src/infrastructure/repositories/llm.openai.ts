import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { LlmRepository } from 'src/domain/repositories/llm.repository';
import { zodTextFormat } from 'openai/helpers/zod';
import z, { ZodSchema } from 'zod';
import { CreateEmbeddingResponse } from 'openai/resources/embeddings';

@Injectable()
export class OpenAiLlmRepository implements LlmRepository {
  private client: OpenAI;

  constructor(private readonly configService: ConfigService) {
    this.client = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
      webhookSecret: this.configService.get<string>('OPENAI_WEBHOOK_SECRET'),
    });
  }

  async answerPrompt<T extends ZodSchema>(
    previousMessageId: string | null = null,
    prompt: string,
    content: string,
    schema: T,
  ): Promise<{ output: z.infer<T> | null; answerId: string }> {
    try {
      const response = await this.client.responses.parse({
        ...(previousMessageId && {
          previous_response_id: previousMessageId,
        }),
        model: 'gpt-4.1-nano',
        instructions: prompt,
        input: content,
        text: {
          format: zodTextFormat(schema, 'schema'),
        },
      });

      if (!response.output_parsed) {
        return { output: null, answerId: response.id };
      }

      return { output: response.output_parsed, answerId: response.id };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error getting OpenAI response: ' + error,
      );
    }
  }

  async embedInput(input: string): Promise<number[]> {
    try {
      const response = await this.client.embeddings.create({
        model: 'text-embedding-3-small',
        input: input,
      });
      return response.data[0].embedding;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error getting OpenAI embedding: ' + error,
      );
    }
  }

  async uploadFile(jsonFile: File): Promise<void> {
    try {
      const uploadedFile = await this.client.files.create({
        file: jsonFile,
        purpose: 'batch',
      });
      if (!uploadedFile.id) {
        throw new InternalServerErrorException(
          'File upload failed, no file ID returned.',
        );
      }
      await this.client.batches.create({
        input_file_id: uploadedFile.id,
        completion_window: '24h',
        endpoint: '/v1/embeddings',
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error uploading file to OpenAI: ' + error,
      );
    }
  }

  async handleWebhook(
    raw: string,
    headers: Record<string, string>,
  ): Promise<
    {
      productId: string;
      embedding: number[];
    }[]
  > {
    try {
      const event = await this.client.webhooks.unwrap(raw, headers);
      if (event.type !== 'batch.completed') {
        throw new Error(`Unhandled event type: ${event.type}`);
      }
      const batch = await this.client.batches.retrieve(event.data.id);
      if (!batch || !batch.output_file_id) {
        throw new Error('Batch retrieval failed or no output file ID.');
      }
      const outputFile = await this.client.files.content(batch.output_file_id);
      const results = (await outputFile.text())
        .split('\n')
        .filter((line) => line.trim() !== '')
        .map((line) => {
          const data = JSON.parse(line) as {
            custom_id: string;
            response: {
              body: CreateEmbeddingResponse;
            };
          };

          return {
            productId: data.custom_id,
            embedding: data.response.body.data[0].embedding,
          };
        });
      return results;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error handling OpenAI webhook: ' + error,
      );
    }
  }
}
