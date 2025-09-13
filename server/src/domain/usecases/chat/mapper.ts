import { ActionType, ChatMessages } from 'generated/prisma';
import { ChatMessage } from 'src/domain/entities/chat-message';
import { ChatSession } from 'src/domain/entities/chat-session';
import { MessageType } from 'src/domain/enums/message-type';
import { MessageType as MessageTypePrisma } from 'generated/prisma';
import { MessageSender } from 'src/domain/enums/message-sender';
import { Sender as MessageSenderPrisma } from 'generated/prisma';
import { ChatSessionWithRelations } from 'src/utils/types/chat-session-with-relations';
import { ChatMessageAction } from 'src/domain/entities/chat-message-action';
import { ChatMessageActions } from 'generated/prisma';
import { MessageActionType } from 'src/domain/enums/message-action-type';
import { ChatMessageWithRelations } from 'src/utils/types/chat-message-with-relations';

const messageTypeMap: Record<MessageType, MessageTypePrisma> = {
  [MessageType.TEXT]: MessageTypePrisma.TEXT,
  [MessageType.SUGGESTION]: MessageTypePrisma.SUGGEST_CARTS_RESULT,
};

const messageSenderMap: Record<MessageSender, MessageSenderPrisma> = {
  [MessageSender.USER]: MessageSenderPrisma.USER,
  [MessageSender.ASSISTANT]: MessageSenderPrisma.ASSISTANT,
};

export class ChatMapper {
  static sessionToDomain(raw: ChatSessionWithRelations): ChatSession {
    return new ChatSession(
      raw.id,
      raw.userId,
      raw.ChatMessages.map(ChatMapper.messageToDomain),
      raw.createdAt,
    );
  }

  static messageToPrisma(message: ChatMessage): ChatMessages {
    return {
      id: message.id || undefined,
      chatSessionId: message.sessionId,
      content: message.content,
      sender: messageSenderMap[message.sender],
      messageType: messageTypeMap[message.messageType],
      openAiMessageId: message.openAiMessageId || undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  static messageToDomain(raw: ChatMessageWithRelations): ChatMessage {
    return new ChatMessage(
      raw.chatSessionId,
      raw.content,
      Object.keys(messageSenderMap).find(
        (key) => messageSenderMap[key as MessageSender] === raw.sender,
      ) as MessageSender,
      Object.keys(messageTypeMap).find(
        (key) => messageTypeMap[key as MessageType] === raw.messageType,
      ) as MessageType,
      raw.createdAt,
      raw.id,
      raw.openAiMessageId || null,
      raw.ChatMessageActions
        ? raw.ChatMessageActions.map(ChatMapper.actionToDomain)
        : null,
    );
  }

  static actionToDomain(raw: ChatMessageActions): ChatMessageAction {
    return new ChatMessageAction(
      Object.keys(ActionType).find(
        (key) => key === 'SUGGEST_CARTS' && raw.actionType === 'SUGGEST_CARTS',
      ) as MessageActionType,
      JSON.stringify(raw.payload),
      raw.chatMessageId,
      raw.id,
      raw.confirmedAt,
      raw.executedAt,
    );
  }
}
