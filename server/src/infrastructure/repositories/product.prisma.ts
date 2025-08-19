import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Product } from 'src/domain/entities/product';
import { ProductMapper } from 'src/domain/usecases/product/mapper';
import { ProductRepository } from 'src/domain/repositories/product.repository';
import { GetCatalogError } from 'src/domain/errors/get-catalog-error';

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private prisma: PrismaService) {}

  async getCatalog(): Promise<Product[]> {
    try {
      const catalog = await this.prisma.product.findMany({
        include: {
          store: true,
        },
      });
      return catalog.map(ProductMapper.toDomain);
    } catch (e) {
      throw new GetCatalogError('Error when getting all products.');
    }
  }
}
