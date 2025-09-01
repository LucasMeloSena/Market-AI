import { Product } from '../entities/product';

export interface ProductRepository {
  getCatalog(filter: string): Promise<Product[]>;
  getById(productId: string): Promise<Product | null>;
}
