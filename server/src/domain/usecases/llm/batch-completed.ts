import { Inject, Injectable } from '@nestjs/common';
import { LlmRepository } from 'src/domain/repositories/llm.repository';
import { ProductRepository } from 'src/domain/repositories/product.repository';

const BATCH_SIZE = 100;

@Injectable()
export class BatchCompletedUseCase {
  constructor(
    @Inject('LlmRepository')
    private readonly llmRepository: LlmRepository,
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(raw: string, headers: Record<string, string>): Promise<void> {
    const results = await this.llmRepository.handleWebhook(raw, headers);
    if (!results.length) {
      throw new Error('No embeddings found in webhook data');
    }

    for (let i = 0; i < results.length; i += BATCH_SIZE) {
      const batch = results.slice(i, i + BATCH_SIZE);
      await this.productRepository.updateEmbedding(batch);
    }
  }
}
