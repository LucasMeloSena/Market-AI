import { Controller, Get, Query } from '@nestjs/common';
import { GetCatalogUseCase } from 'src/domain/usecases/product/get-catalog';

@Controller('product')
export class ProductController {
  constructor(private readonly getCatalogUseCase: GetCatalogUseCase) {}

  @Get('catalog')
  async getCatalog(@Query('search') filter: string) {
    return this.getCatalogUseCase.execute(filter);
  }
}
