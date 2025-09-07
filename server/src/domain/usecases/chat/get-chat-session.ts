import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ChatSession } from 'src/domain/entities/chat-session';
import { ChatRepository } from 'src/domain/repositories/chat.repository';

@Injectable()
export class GetChatSessionUseCase {
  constructor(
    @Inject('ChatRepository')
    private readonly repository: ChatRepository,
  ) {}

  async execute(sessionId: string): Promise<ChatSession> {
    const chatSession = await this.repository.getChatSession(sessionId);
    if (!chatSession) {
      throw new NotFoundException('Chat session not found');
    }
    return chatSession;
  }
}
