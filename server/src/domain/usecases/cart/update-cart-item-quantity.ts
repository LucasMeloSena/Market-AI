import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CartDto } from 'src/domain/dtos/cart.dto';
import { CartRepository } from 'src/domain/repositories/cart.repository';

@Injectable()
export class UpdateCartItemQuantityUseCase {
  constructor(
    @Inject('CartRepository')
    private readonly cartRepository: CartRepository,
  ) {}

  async execute(cartId: string, cart: CartDto): Promise<void> {
    if (cart.quantity < 1) {
      throw new Error('Invalid cart item quantity');
    }

    const registeredCart = await this.cartRepository.getCartByUser(cart.userId);

    if (!registeredCart) {
      throw new NotFoundException('Cart not found');
    }
    if (
      registeredCart.items.every((item) => item.product.id !== cart.productId)
    ) {
      throw new NotFoundException('Cart item not found');
    }

    await this.cartRepository.updateCartItemQuantity(
      cartId,
      cart.productId,
      cart.quantity,
    );
  }
}
