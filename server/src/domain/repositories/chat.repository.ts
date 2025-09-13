import { Cart } from '../entities/cart';
import { ChatMessage } from '../entities/chat-message';
import { ChatMessageAction } from '../entities/chat-message-action';
import { ChatSession } from '../entities/chat-session';

export interface ChatRepository {
  createChatSession(userId: string): Promise<string>;
  getAllChatSessions(userId: string): Promise<ChatSession[]>;
  getChatSession(sessionId: string): Promise<ChatSession | null>;
  getAiMessageId(sessionId: string): Promise<string | null>;
  addMessageToSession(message: ChatMessage): Promise<ChatMessage>;
  addMessageAction(action: ChatMessageAction): Promise<void>;
  getUnconfirmedAction(actionId: string): Promise<ChatMessageAction | null>;
  confirmAction(actionId: string): Promise<void>;
  markActionAsExecuted(actionId: string): Promise<void>;
  getRelatedCarts(messageId: string): Promise<Cart[]>;
}
