import { ChatMessage } from './chat-message';

export class ChatSession {
  constructor(
    public id: string,
    public userId: string,
    public messages: ChatMessage[],
  ) {}
}
