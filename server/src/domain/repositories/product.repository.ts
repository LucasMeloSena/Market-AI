import { Product } from '../entities/product';

export interface ProductRepository {
  getCatalog(): Promise<Product[]>;
}
