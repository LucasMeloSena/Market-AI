import { Body, Controller, Headers, Post } from '@nestjs/common';
import { BatchCompletedUseCase } from 'src/domain/usecases/llm/batch-completed';

@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly batchCompletedUseCase: BatchCompletedUseCase) {}

  @Post('openai')
  async handleOpenAIWebhook(
    @Body() body: string,
    @Headers() headers: Record<string, string>,
  ): Promise<void> {
    return await this.batchCompletedUseCase.execute(body, headers);
  }
}
