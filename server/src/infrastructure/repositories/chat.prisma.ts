import { ChatRepository } from 'src/domain/repositories/chat.repository';
import { PrismaService } from '../prisma/prisma.service';
import { ChatSession } from 'src/domain/entities/chat-session';
import { ChatMapper } from 'src/domain/usecases/chat/mapper';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ChatMessage } from 'src/domain/entities/chat-message';
import { ChatMessageAction } from 'src/domain/entities/chat-message-action';
import { MessageActionType } from 'src/domain/enums/message-action-type';

@Injectable()
export class PrismaChatRepository implements ChatRepository {
  constructor(private prisma: PrismaService) {}

  async createChatSession(userId: string): Promise<string> {
    try {
      const createdChatSession = await this.prisma.chatSessions.create({
        data: {
          userId,
        },
      });
      return createdChatSession.id;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error creating chat session.' + error,
      );
    }
  }

  async getChatSession(sessionId: string): Promise<ChatSession | null> {
    try {
      const chatSession = await this.prisma.chatSessions.findUnique({
        where: { id: sessionId },
        include: {
          ChatMessages: {
            include: {
              ChatMessageActions: true,
            },
          },
        },
      });
      if (!chatSession) return null;
      return ChatMapper.sessionToDomain(chatSession);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error fetching chat session.' + error,
      );
    }
  }

  async addMessageToSession(message: ChatMessage): Promise<ChatMessage> {
    try {
      const chatMessage = await this.prisma.chatMessages.create({
        data: ChatMapper.messageToPrisma(message),
        include: {
          ChatMessageActions: true,
        },
      });
      return ChatMapper.messageToDomain(chatMessage);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error adding message to chat session.' + error,
      );
    }
  }

  async getAiMessageId(sessionId: string): Promise<string | null> {
    try {
      const aiMessageId = await this.prisma.chatMessages.findFirst({
        where: {
          chatSessionId: sessionId,
          sender: 'ASSISTANT',
        },
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          openAiMessageId: true,
        },
        take: 1,
      });
      if (!aiMessageId) return null;
      return aiMessageId?.openAiMessageId;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error fetching AI message.' + error,
      );
    }
  }

  async addMessageAction(action: ChatMessageAction): Promise<void> {
    try {
      await this.prisma.chatMessageActions.create({
        data: {
          actionType:
            action.actionType == MessageActionType.SUGGEST_CARTS
              ? 'SUGGEST_CARTS'
              : 'SUGGEST_CARTS',
          payload: action.payload,
          chatMessageId: action.chatMessageId,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error adding message action.' + error,
      );
    }
  }

  async getUnconfirmedAction(
    actionId: string,
  ): Promise<ChatMessageAction | null> {
    try {
      const action = await this.prisma.chatMessageActions.findUnique({
        where: { id: actionId, confirmedAt: { equals: null } },
      });
      if (!action) return null;
      return ChatMapper.actionToDomain(action);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error getting unconfirmed action.' + error,
      );
    }
  }

  async confirmAction(actionId: string): Promise<void> {
    try {
      await this.prisma.chatMessageActions.update({
        where: { id: actionId },
        data: { confirmedAt: new Date() },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error confirming action.' + error,
      );
    }
  }

  async markActionAsExecuted(actionId: string): Promise<void> {
    try {
      await this.prisma.chatMessageActions.update({
        where: { id: actionId },
        data: { executedAt: new Date() },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error marking action as executed.' + error,
      );
    }
  }
}
