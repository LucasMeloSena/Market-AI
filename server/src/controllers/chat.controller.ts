import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatSession } from 'src/domain/entities/chat-session';
import { CreateChatSessionUseCase } from 'src/domain/usecases/chat/create-chat-session';
import { GetChatSessionUseCase } from 'src/domain/usecases/chat/get-chat-session';
import { AddUserMessageUseCase } from 'src/domain/usecases/chat/add-user-message';
import { ChatMessage } from 'src/domain/entities/chat-message';
import { ChatMessageDto } from 'src/domain/dtos/chat-message.dto';
import { ConfirmActionUseCase } from 'src/domain/usecases/chat/confirm-action';

const userId = '7f763aed-7e3a-4c31-b3a6-d6a175bc34bc';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly createChatSessionUseCase: CreateChatSessionUseCase,
    private readonly getChatSessionUseCase: GetChatSessionUseCase,
    private readonly addUserMessageUseCase: AddUserMessageUseCase,
    private readonly confirmActionUseCase: ConfirmActionUseCase,
  ) {}

  @Get(':sessionId')
  async getChatSession(
    @Param('sessionId') sessionId: string,
  ): Promise<ChatSession> {
    return await this.getChatSessionUseCase.execute(sessionId);
  }

  @Post()
  async createChatSession(): Promise<{ data: string }> {
    const response = await this.createChatSessionUseCase.execute(userId);
    return {
      data: response,
    };
  }

  @Post(':sessionId/message')
  async addUserMessage(
    @Param('sessionId') sessionId: string,
    @Body() body: ChatMessageDto,
  ): Promise<ChatMessage> {
    const { content } = body;
    const response = await this.addUserMessageUseCase.execute(
      sessionId,
      content,
    );
    return response;
  }

  @Post(':sessionId/actions/:actionId/confirm')
  async confirmAction(
    @Param('sessionId') sessionId: string,
    @Param('actionId') actionId: string,
  ): Promise<void> {
    return await this.confirmActionUseCase.execute(sessionId, actionId);
  }
}
