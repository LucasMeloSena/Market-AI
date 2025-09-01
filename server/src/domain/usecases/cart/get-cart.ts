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
    return this.cartRepository.getCart(userId);
  }
}
