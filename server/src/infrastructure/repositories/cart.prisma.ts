import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CartRepository } from 'src/domain/repositories/cart.repository';
import { PrismaService } from '../prisma/prisma.service';
import { CartDto } from 'src/domain/dtos/cart.dto';
import { CartMapper } from 'src/domain/usecases/cart/mapper';
import { Cart } from 'src/domain/entities/cart';

@Injectable()
export class PrismaCartRepository implements CartRepository {
  constructor(private prisma: PrismaService) {}

  async createCart(cart: CartDto, storeId: string): Promise<void> {
    try {
      await this.prisma.cart.create({
        data: {
          userId: cart.userId,
          storeId: storeId,
          CartItem: {
            create: {
              productId: cart.productId,
              quantity: cart.quantity,
            },
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to create cart. Error: ${error.message}`,
      );
    }
  }

  async addToCart(cartId: string, cartDto: CartDto): Promise<void> {
    try {
      await this.prisma.cartItem.upsert({
        where: {
          cartId_productId: {
            cartId: cartId,
            productId: cartDto.productId,
          },
        },
        update: {
          quantity: { increment: 1 },
        },
        create: {
          cartId: cartId,
          productId: cartDto.productId,
          quantity: cartDto.quantity,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to add item to cart');
    }
  }

  async getCart(userId: string): Promise<Cart | null> {
    try {
      const cart = await this.prisma.cart.findMany({
        where: { userId, active: true },
        include: {
          store: true,
          user: true,
          CartItem: {
            include: {
              product: true,
            },
          },
        },
      });
      return cart.length ? CartMapper.toDomain(cart[0]) : null;
    } catch (error) {
      throw new InternalServerErrorException('Failed to get cart');
    }
  }

  async inactiveCart(cartId: string): Promise<void> {
    try {
      await this.prisma.cart.update({
        where: { id: cartId },
        data: { active: false },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to inactive cart');
    }
  }

  async updateCartItemQuantity(
    cartId: string,
    productId: string,
    quantity: number,
  ): Promise<void> {
    try {
      await this.prisma.$transaction(async (tx) => {
        await tx.cart.update({
          where: { id: cartId },
          data: { active: true },
        });
        await tx.cartItem.update({
          where: { cartId_productId: { cartId, productId } },
          data: { quantity },
        });
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to update cart item quantity',
      );
    }
  }

  async removeProductFromCart(
    cartId: string,
    productId: string,
  ): Promise<void> {
    try {
      await this.prisma.cartItem.delete({
        where: { cartId_productId: { cartId, productId } },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to remove product from cart',
      );
    }
  }
}
