import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Product } from 'src/domain/entities/product';
import { ProductMapper } from 'src/domain/usecases/product/mapper';
import { ProductRepository } from 'src/domain/repositories/product.repository';
import { GetCatalogError } from 'src/domain/errors/get-catalog-error';

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private prisma: PrismaService) {}

  async getCatalog(filter: string): Promise<Product[]> {
    try {
      const catalog = await this.prisma.product.findMany({
        where: {
          name: {
            contains: filter,
            mode: 'insensitive',
          },
        },
        include: {
          store: true,
        },
      });
      return catalog.map(ProductMapper.toDomain);
    } catch (e) {
      throw new GetCatalogError('Error when getting all products.');
    }
  }

  async getById(productId: string): Promise<Product | null> {
    try {
      const product = await this.prisma.product.findUnique({
        where: {
          id: productId,
        },
        include: {
          store: true,
        },
      });
      return ProductMapper.toDomain(product);
    } catch (e) {
      throw new NotFoundException('Error when getting product by ID.');
    }
  }
}
