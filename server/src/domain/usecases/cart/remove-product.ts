import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CartRepository } from 'src/domain/repositories/cart.repository';

@Injectable()
export class RemoveProductFromCartUseCase {
  constructor(
    @Inject('CartRepository')
    private readonly cartRepository: CartRepository,
  ) {}

  async execute(userId: string, productId: string): Promise<void> {
    const registeredCart = await this.cartRepository.getCart(userId);

    if (!registeredCart) {
      throw new NotFoundException('Cart not found');
    }
    if (registeredCart.items.every((item) => item.product.id !== productId)) {
      throw new NotFoundException('Cart item not found');
    }

    await this.cartRepository.removeProductFromCart(
      registeredCart.id,
      productId,
    );
  }
}
