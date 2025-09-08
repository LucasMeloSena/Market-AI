import { Inject, Injectable } from '@nestjs/common';
import { MessageActionType } from 'src/domain/enums/message-action-type';
import { ChatRepository } from 'src/domain/repositories/chat.repository';
import { LlmRepository } from 'src/domain/repositories/llm.repository';
import { ProductRepository } from 'src/domain/repositories/product.repository';

@Injectable()
export class ConfirmActionUseCase {
  constructor(
    @Inject('ChatRepository')
    private readonly chatRepository: ChatRepository,
    @Inject('LlmRepository')
    private readonly llmRepository: LlmRepository,
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(sessionId: string, actionId: string): Promise<void> {
    const [session, action] = await Promise.all([
      this.chatRepository.getChatSession(sessionId),
      this.chatRepository.getUnconfirmedAction(actionId),
    ]);
    if (session && action) {
      await this.chatRepository.confirmAction(actionId);
    }
    if (action.actionType == MessageActionType.SUGGEST_CARTS) {
      const embedding = await this.llmRepository.embedInput(action.payload);
      const relevantProducts =
        await this.productRepository.getRelevantProductsByStore(embedding);
      if (!relevantProducts.length) {
        throw new Error('Missing products embeddings');
      }
      console.log(relevantProducts);
    }
  }
}
