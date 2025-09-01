import { Module } from '@nestjs/common';
import { CartController } from 'src/controllers/cart.controller';
import { AddToCartUseCase } from 'src/domain/usecases/cart/add-to-cart';
import { GetCartUseCase } from 'src/domain/usecases/cart/get-cart';
import { RemoveProductFromCartUseCase } from 'src/domain/usecases/cart/remove-product';
import { UpdateCartItemQuantityUseCase } from 'src/domain/usecases/cart/update-cart-item-quantity';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { PrismaCartRepository } from 'src/infrastructure/repositories/cart.prisma';
import { PrismaProductRepository } from 'src/infrastructure/repositories/product.prisma';

@Module({
  imports: [],
  controllers: [CartController],
  providers: [
    PrismaService,
    {
      provide: 'CartRepository',
      useClass: PrismaCartRepository,
    },
    {
      provide: 'ProductRepository',
      useClass: PrismaProductRepository,
    },
    AddToCartUseCase,
    GetCartUseCase,
    UpdateCartItemQuantityUseCase,
    RemoveProductFromCartUseCase,
  ],
})
export class CartModule {}
