import { Module } from '@nestjs/common';
import { WebhooksController } from 'src/controllers/webhooks.controller';
import { BatchCompletedUseCase } from 'src/domain/usecases/llm/batch-completed';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { OpenAiLlmRepository } from 'src/infrastructure/repositories/llm.openai';
import { PrismaProductRepository } from 'src/infrastructure/repositories/product.prisma';

@Module({
  imports: [],
  controllers: [WebhooksController],
  providers: [
    PrismaService,
    {
      provide: 'ProductRepository',
      useClass: PrismaProductRepository,
    },
    {
      provide: 'LlmRepository',
      useClass: OpenAiLlmRepository,
    },
    BatchCompletedUseCase,
  ],
})
export class WebhooksModule {}
