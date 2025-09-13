import { Inject, Injectable } from '@nestjs/common';
import { Cart } from 'src/domain/entities/cart';
import { CartRepository } from 'src/domain/repositories/cart.repository';

@Injectable()
export class GetCartUseCase {
  constructor(
    @Inject('CartRepository')
    private readonly cartRepository: CartRepository,
  ) {}

  async execute(userId: string): Promise<Cart> {
    const cart = await this.cartRepository.getCartByUser(userId);
    const total = cart.items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0,
    );
    cart.total = total;
    return cart;
  }
}
