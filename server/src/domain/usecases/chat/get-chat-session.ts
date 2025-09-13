import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ChatSession } from 'src/domain/entities/chat-session';
import { MessageType } from 'src/domain/enums/message-type';
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

    const result = await Promise.all(
      chatSession.messages.map(async (message) => {
        if (message.messageType !== MessageType.SUGGESTION) {
          return message;
        }

        const relatedCarts = await this.repository.getRelatedCarts(
          message.openAiMessageId,
        );
        const cartsWithTotal = relatedCarts.map((cart) => {
          const total = cart.items.reduce((accumulator, item) => {
            const price = item.product?.price ?? 0;
            const quantity = item.quantity ?? 0;
            return accumulator + price * quantity;
          }, 0);

          return {
            ...cart,
            total,
          };
        });

        return {
          ...message,
          carts: cartsWithTotal,
        };
      }),
    );

    chatSession.messages = result;
    return chatSession;
  }
}
