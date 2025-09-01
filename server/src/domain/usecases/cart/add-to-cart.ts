import { Inject, Injectable } from '@nestjs/common';
import { CartDto } from 'src/domain/dtos/cart.dto';
import { CartRepository } from 'src/domain/repositories/cart.repository';
import { ProductRepository } from 'src/domain/repositories/product.repository';

@Injectable()
export class AddToCartUseCase {
  constructor(
    @Inject('CartRepository')
    private readonly cartRepository: CartRepository,
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(cart: CartDto): Promise<void> {
    const product = await this.productRepository.getById(cart.productId);
    const existingCart = await this.cartRepository.getCart(cart.userId);
    if (existingCart && product?.store.id === existingCart.store.id) {
      return await this.cartRepository.addToCart(existingCart.id, cart);
    } else if (existingCart && product?.store.id !== existingCart.store.id) {
      await this.cartRepository.inactiveCart(existingCart.id);
      return await this.cartRepository.createCart(cart, product.store.id);
    } else {
      return await this.cartRepository.createCart(cart, product.store.id);
    }
  }
}
