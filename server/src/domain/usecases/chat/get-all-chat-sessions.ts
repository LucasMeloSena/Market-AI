import { Inject, Injectable } from '@nestjs/common';
import { ChatSession } from 'src/domain/entities/chat-session';
import { ChatRepository } from 'src/domain/repositories/chat.repository';

@Injectable()
export class GetAllChatSessionsUseCase {
  constructor(
    @Inject('ChatRepository')
    private readonly chatRepository: ChatRepository,
  ) {}

  async execute(userId: string): Promise<ChatSession[]> {
    return await this.chatRepository.getAllChatSessions(userId);
  }
}
