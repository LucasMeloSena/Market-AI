import { Inject, Injectable } from '@nestjs/common';
import { Product } from 'src/domain/entities/product';
import { ProductRepository } from 'src/domain/repositories/product.repository';

@Injectable()
export class GetCatalogUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(): Promise<Product[]> {
    return this.productRepository.getCatalog();
  }
}
