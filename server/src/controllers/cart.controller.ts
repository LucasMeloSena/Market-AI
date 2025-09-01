import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CartDto } from 'src/domain/dtos/cart.dto';
import { AddToCartUseCase } from 'src/domain/usecases/cart/add-to-cart';
import { GetCartUseCase } from 'src/domain/usecases/cart/get-cart';

@Controller('cart')
export class CartController {
  constructor(
    private readonly getCartUseCase: GetCartUseCase,
    private readonly addCartUseCase: AddToCartUseCase,
  ) {}

  @Get()
  async getCart(@Query('userId') userId: string) {
    return this.getCartUseCase.execute(userId);
  }

  @Post()
  async addToCart(@Body() body: CartDto) {
    return this.addCartUseCase.execute(body);
  }
}
