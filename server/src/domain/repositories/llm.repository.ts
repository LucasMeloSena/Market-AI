import z, { ZodSchema } from 'zod';

export interface LlmRepository {
  answerPrompt<T extends ZodSchema>(
    previousMessageId: string,
    prompt: string,
    content: string,
    schema: ZodSchema,
  ): Promise<{ output: z.infer<T> | null; answerId: string }>;
  embedInput(input: string): Promise<number[]>;
  uploadFile(jsonFile: File): Promise<void>;
  handleWebhook(
    raw: string,
    headers: Record<string, string>,
  ): Promise<
    {
      productId: string;
      embedding: number[];
    }[]
  >;
}
