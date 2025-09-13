import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Product } from 'src/domain/entities/product';
import { ProductMapper } from 'src/domain/usecases/product/mapper';
import { ProductRepository } from 'src/domain/repositories/product.repository';
import { GetCatalogError } from 'src/domain/errors/get-catalog-error';
import { ProductsGroupedByStore } from 'src/domain/entities/products-grouped-by-store';

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

  async getRelevantProductsByStore(
    embedding: number[],
    similarityThreshold = 0.5,
  ): Promise<ProductsGroupedByStore[]> {
    try {
      const result = await this.prisma.$queryRaw<ProductsGroupedByStore[]>`
        SELECT json_build_object(
          'id', s.id,
          'name', s.name,
          'products', json_agg(p)
        ) AS store
        FROM "Product" p
        INNER JOIN "Store" s ON p."storeId" = s."id"
        WHERE p.embedding <=> ${embedding}::vector < ${similarityThreshold}
        GROUP BY s."id"
        ORDER BY MIN(embedding <=> ${embedding}::vector)
        LIMIT 5;
      `;
      return result;
    } catch (e) {
      throw new InternalServerErrorException(
        `Error when getting relevant products. Error: ${e.message}`,
      );
    }
  }

  async updateEmbedding(
    products: { productId: string; embedding: number[] }[],
  ): Promise<void> {
    try {
      await this.prisma.$transaction(
        products.map((product) =>
          this.prisma.$executeRawUnsafe(
            `
              UPDATE "Product"
              SET embedding = $1::vector
              WHERE id = $2
            `,
            product.embedding,
            product.productId,
          ),
        ),
      );
    } catch (e) {
      throw new InternalServerErrorException(
        'Error when updating product embeddings.',
      );
    }
  }
}
