import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { MessageActionType } from 'src/domain/enums/message-action-type';
import { ChatRepository } from 'src/domain/repositories/chat.repository';
import { LlmRepository } from 'src/domain/repositories/llm.repository';
import { ProductRepository } from 'src/domain/repositories/product.repository';
import { SuggestCartsUseCase } from '../llm/suggest-carts';
import { CartRepository } from 'src/domain/repositories/cart.repository';
import { MessageSender } from 'src/domain/enums/message-sender';
import { MessageType } from 'src/domain/enums/message-type';
import { sanitizeSuggestedCarts } from 'src/utils/scripts/sanitize-carts';

const userId = '3b05679a-f145-4594-ad38-9fbfc6dc571b';

@Injectable()
export class ConfirmActionUseCase {
  constructor(
    @Inject('ChatRepository')
    private readonly chatRepository: ChatRepository,
    @Inject('LlmRepository')
    private readonly llmRepository: LlmRepository,
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
    @Inject('CartRepository')
    private readonly cartRepository: CartRepository,
    private readonly suggestCartsUseCase: SuggestCartsUseCase,
  ) {}

  async execute(sessionId: string, actionId: string): Promise<void> {
    const [session, action] = await Promise.all([
      this.chatRepository.getChatSession(sessionId),
      this.chatRepository.getUnconfirmedAction(actionId),
    ]);
    if (session && action) {
      await this.chatRepository.confirmAction(actionId);
    }
    if (!action?.actionType) {
      throw new BadRequestException('No chat message marked as unconfirmed.');
    }

    if (action.actionType == MessageActionType.SUGGEST_CARTS) {
      const embedding = await this.llmRepository.embedInput(action.payload);
      const relevantProducts =
        await this.productRepository.getRelevantProductsByStore(embedding);
      if (!relevantProducts.length) {
        throw new Error('Missing products embeddings');
      }

      const llmResponse = await this.suggestCartsUseCase.execute(
        action.payload,
        relevantProducts,
      );
      const sanitizedOutput = sanitizeSuggestedCarts(llmResponse.output);

      await this.chatRepository.markActionAsExecuted(actionId);
      await this.cartRepository.saveSuggestedCarts(
        userId,
        llmResponse.answerId,
        sanitizedOutput,
      );

      await this.chatRepository.addMessageToSession({
        sessionId: sessionId,
        content: JSON.stringify(llmResponse.output),
        sender: MessageSender.ASSISTANT,
        messageType: MessageType.SUGGESTION,
        openAiMessageId: llmResponse.answerId,
      });
    }
  }
}
