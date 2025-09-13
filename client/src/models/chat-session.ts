import { ChatMessage } from './chat-message';

export class ChatSession {
  constructor(
    public id: string,
    public userId: string,
    public createdAt: Date,
    public messages: ChatMessage[],
  ) {}
}
