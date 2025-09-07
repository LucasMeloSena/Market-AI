import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ProductRepository } from 'src/domain/repositories/product.repository';
import { BatchEmbedProductsUseCase } from '../llm/batch-embed-products';

@Injectable()
export class EmbedProductsUseCase implements OnApplicationBootstrap {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
    private readonly batchEmbedProducts: BatchEmbedProductsUseCase,
    private readonly configService: ConfigService,
  ) {}

  async onApplicationBootstrap() {
    if (this.configService.get('ENV') === 'test') {
      console.log('Skipping catalog embedding in test mode');
      return;
    }

    const products = await this.productRepository.getCatalog('');
    if (!products.length) {
      console.log('No products found to embed');
      return;
    }

    const formattedProducts = products.map((product) => ({
      id: product.id,
      name: product.name,
    }));

    await this.batchEmbedProducts.execute(formattedProducts);
  }
}
