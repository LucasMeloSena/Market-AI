import { MessageActionType } from '../enums/message-action-type';

export class ChatMessageAction {
  constructor(
    public actionType: MessageActionType,
    public payload: string,
    public chatMessageId: string,
    public id?: string | null,
  ) {}
}
