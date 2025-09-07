import { Inject, Injectable } from '@nestjs/common';
import { ChatRepository } from 'src/domain/repositories/chat.repository';

@Injectable()
export class CreateChatSessionUseCase {
  constructor(
    @Inject('ChatRepository')
    private readonly repository: ChatRepository,
  ) {}

  async execute(userId: string): Promise<string> {
    return await this.repository.createChatSession(userId);
  }
}
