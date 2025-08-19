import { Module } from '@nestjs/common';
import { ProductController } from 'src/controllers/product.controller';
import { GetCatalogUseCase } from 'src/domain/usecases/product/get-catalog';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { PrismaProductRepository } from 'src/infrastructure/repositories/product.prisma';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [
    PrismaService,
    {
      provide: 'ProductRepository',
      useClass: PrismaProductRepository,
    },
    GetCatalogUseCase,
  ],
})
export class ProductModule {}
