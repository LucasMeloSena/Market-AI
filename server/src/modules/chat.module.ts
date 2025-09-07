import { Module } from '@nestjs/common';
import { ChatController } from 'src/controllers/chat.controller';
import { AddMessageActionUseCase } from 'src/domain/usecases/chat/add-message-action';
import { AddMessageToSessionUseCase } from 'src/domain/usecases/chat/add-message-to-session';
import { AddUserMessageUseCase } from 'src/domain/usecases/chat/add-user-message';
import { ConfirmActionUseCase } from 'src/domain/usecases/chat/confirm-action';
import { CreateChatSessionUseCase } from 'src/domain/usecases/chat/create-chat-session';
import { GetChatSessionUseCase } from 'src/domain/usecases/chat/get-chat-session';
import { AnswerPropmtUseCase } from 'src/domain/usecases/llm/answer-prompt';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { PrismaChatRepository } from 'src/infrastructure/repositories/chat.prisma';
import { OpenAiLlmRepository } from 'src/infrastructure/repositories/llm.openai';
import { PrismaProductRepository } from 'src/infrastructure/repositories/product.prisma';

@Module({
  imports: [],
  controllers: [ChatController],
  providers: [
    PrismaService,
    {
      provide: 'ChatRepository',
      useClass: PrismaChatRepository,
    },
    {
      provide: 'LlmRepository',
      useClass: OpenAiLlmRepository,
    },
    {
      provide: 'ProductRepository',
      useClass: PrismaProductRepository,
    },
    GetChatSessionUseCase,
    CreateChatSessionUseCase,
    AddUserMessageUseCase,
    AddMessageToSessionUseCase,
    AnswerPropmtUseCase,
    AddMessageActionUseCase,
    ConfirmActionUseCase,
  ],
})
export class ChatModule {}
