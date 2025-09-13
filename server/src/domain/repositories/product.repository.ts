import { Product } from '../entities/product';
import { ProductsGroupedByStore } from '../entities/products-grouped-by-store';

export interface ProductRepository {
  getCatalog(filter: string): Promise<Product[]>;
  getById(productId: string): Promise<Product | null>;
  getRelevantProductsByStore(
    embedding: number[],
  ): Promise<ProductsGroupedByStore[]>;
  updateEmbedding(
    products: {
      productId: string;
      embedding: number[];
    }[],
  ): Promise<void>;
}
