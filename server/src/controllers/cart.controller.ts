import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CartDto } from 'src/domain/dtos/cart.dto';
import { AddToCartUseCase } from 'src/domain/usecases/cart/add-to-cart';
import { GetCartUseCase } from 'src/domain/usecases/cart/get-cart';
import { RemoveProductFromCartUseCase } from 'src/domain/usecases/cart/remove-product';
import { UpdateCartItemQuantityUseCase } from 'src/domain/usecases/cart/update-cart-item-quantity';

@Controller('cart')
export class CartController {
  constructor(
    private readonly getCartUseCase: GetCartUseCase,
    private readonly addCartUseCase: AddToCartUseCase,
    private readonly updateCartItemQuantityUseCase: UpdateCartItemQuantityUseCase,
    private readonly removeProductFromCartUseCase: RemoveProductFromCartUseCase,
  ) {}

  @Get()
  async getCart(@Query('userId') userId: string) {
    return this.getCartUseCase.execute(userId);
  }

  @Post()
  async addToCart(@Body() body: CartDto) {
    return this.addCartUseCase.execute(body);
  }

  @Patch(':cartId')
  async updateCartItemQuantity(
    @Param('cartId') cartId: string,
    @Body() body: CartDto,
  ) {
    return this.updateCartItemQuantityUseCase.execute(cartId, body);
  }

  @Delete(':userId/:productId')
  async removeProductFromCart(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
  ) {
    return this.removeProductFromCartUseCase.execute(userId, productId);
  }
}
