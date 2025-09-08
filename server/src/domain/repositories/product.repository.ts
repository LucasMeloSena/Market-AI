import { Product } from '../entities/product';
import { Store } from '../entities/store';

export interface ProductRepository {
  getCatalog(filter: string): Promise<Product[]>;
  getById(productId: string): Promise<Product | null>;
  getRelevantProductsByStore(embedding: number[]): Promise<Store[]>;
  updateEmbedding(
    products: {
      productId: string;
      embedding: number[];
    }[],
  ): Promise<void>;
}
