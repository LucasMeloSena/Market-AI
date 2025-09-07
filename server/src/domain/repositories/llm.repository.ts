import { AnswerMessage } from 'src/infrastructure/repositories/llm.openai';

export interface LlmRepository {
  answerPrompt(
    previousMessageId: string,
    prompt: string,
    content: string,
  ): Promise<{ output: AnswerMessage | null; answerId: string }>;
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
