import { Inject, Injectable } from '@nestjs/common';
import { ChatMessageAction } from 'src/domain/entities/chat-message-action';
import { ChatRepository } from 'src/domain/repositories/chat.repository';

@Injectable()
export class AddMessageActionUseCase {
  constructor(
    @Inject('ChatRepository')
    private readonly repository: ChatRepository,
  ) {}

  async execute(action: ChatMessageAction): Promise<void> {
    await this.repository.addMessageAction(action);
  }
}
