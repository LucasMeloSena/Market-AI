import { Inject, Injectable } from '@nestjs/common';
import { ChatMessage } from 'src/domain/entities/chat-message';
import { ChatRepository } from 'src/domain/repositories/chat.repository';

@Injectable()
export class AddMessageToSessionUseCase {
  constructor(
    @Inject('ChatRepository')
    private readonly repository: ChatRepository,
  ) {}

  async execute(message: ChatMessage): Promise<ChatMessage> {
    return await this.repository.addMessageToSession(message);
  }
}
