import { CartDto } from '../dtos/cart.dto';
import { Cart } from '../entities/cart';
import { SuggestCarts } from '../usecases/llm/suggest-carts';

export interface CartRepository {
  createCart(cart: CartDto, storeId: string): Promise<void>;
  addToCart(cartId: string, cartDto: CartDto): Promise<void>;
  getCartByUser(userId: string): Promise<Cart | null>;
  getCartById(cartId: string): Promise<Cart | null>;
  inactiveCart(cartId: string): Promise<void>;
  updateCartItemQuantity(
    cartId: string,
    productId: string,
    quantity: number,
  ): Promise<void>;
  removeProductFromCart(cartId: string, productId: string): Promise<void>;
  saveSuggestedCarts(
    userId: string,
    messageId: string,
    suggestedCarts: SuggestCarts,
  ): Promise<void>;
  chooseCart(cartId: string, userId: string): Promise<void>;
}
