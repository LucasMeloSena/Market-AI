import { Product } from '../entities/product';

export interface ProductRepository {
  getCatalog(filter: string): Promise<Product[]>;
  getById(productId: string): Promise<Product | null>;
  getRelevantProductsByStore(embedding: number[]): Promise<Product[]>;
  updateEmbedding(
    products: {
      productId: string;
      embedding: number[];
    }[],
  ): Promise<void>;
}
