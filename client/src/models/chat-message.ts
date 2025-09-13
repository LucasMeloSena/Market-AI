import { MessageSender } from '../enums/message-sender';
import { MessageType } from '../enums/message-type';
import { Cart } from './cart';
import { ChatMessageAction } from './chat-message-action';

export class ChatMessage {
  constructor(
    public sessionId: string,
    public content: string,
    public sender: MessageSender,
    public messageType: MessageType,
    public createdAt: Date,
    public id?: string | null,
    public openAiMessageId?: string | null,
    public chatMessageActions?: ChatMessageAction[] | null,
    public carts?: Cart[] | null,
  ) {}
}
