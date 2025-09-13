import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CartRepository } from 'src/domain/repositories/cart.repository';

@Injectable()
export class ChooseCartUseCase {
  constructor(
    @Inject('CartRepository')
    private readonly cartRepository: CartRepository,
  ) {}

  async execute(cartId: string, userId: string) {
    const cart = this.cartRepository.getCartById(cartId);
    if (!cart) {
      throw new NotFoundException(`Cart with given id ${cartId} not found.`);
    }
    await this.cartRepository.chooseCart(cartId, userId);
  }
}
