import { ProductWithRelations } from 'src/utils/types/product-with-relations';
import { Product } from '../../entities/product';

export class ProductMapper {
  static toDomain(product: ProductWithRelations): Product {
    return new Product(
      product.id,
      product.name,
      Number(product.price),
      product.embedding,
      product.store,
    );
  }
}
