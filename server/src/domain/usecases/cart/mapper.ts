import { Cart } from 'src/domain/entities/cart';
import { CartWithRelations } from 'src/utils/types/cart-with-relations';

export class CartMapper {
  static toDomain(cart: CartWithRelations): Cart {
    return new Cart(cart.id, cart.active, cart.store, cart.user, cart.CartItem);
  }
}
