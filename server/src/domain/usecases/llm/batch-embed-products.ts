import { Inject, Injectable } from '@nestjs/common';
import { LlmRepository } from 'src/domain/repositories/llm.repository';

@Injectable()
export class BatchEmbedProductsUseCase {
  constructor(
    @Inject('LlmRepository')
    private readonly llmRepository: LlmRepository,
  ) {}

  async execute(products: { id: string; name: string }[]): Promise<void> {
    const json = products
      .map((product) =>
        JSON.stringify({
          custom_id: product.id,
          method: 'POST',
          url: '/v1/embeddings',
          body: {
            model: 'text-embedding-3-small',
            input: product.name,
          },
        }),
      )
      .join('\n');

    const jsonFile = new File([json], 'products.jsonl', {
      type: 'application/jsonl',
    });

    await this.llmRepository.uploadFile(jsonFile);
  }
}
