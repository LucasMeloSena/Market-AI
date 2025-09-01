import { CartDto } from '../dtos/cart.dto';
import { Cart } from '../entities/cart';

export interface CartRepository {
  createCart(cart: CartDto, storeId: string): Promise<void>;
  addToCart(cartId: string, cartDto: CartDto): Promise<void>;
  getCart(userId: string): Promise<Cart | null>;
  inactiveCart(cartId: string): Promise<void>;
  updateCartItemQuantity(
    cartId: string,
    productId: string,
    quantity: number,
  ): Promise<void>;
  removeProductFromCart(cartId: string, productId: string): Promise<void>;
}
