import { Controller, Get } from '@nestjs/common';
import { GetCatalogUseCase } from 'src/domain/usecases/product/get-catalog';

@Controller('product')
export class ProductController {
  constructor(private readonly getCatalogUseCase: GetCatalogUseCase) {}

  @Get('catalog')
  async getCatalog() {
    return this.getCatalogUseCase.execute();
  }
}
