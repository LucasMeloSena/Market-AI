import { Inject, Injectable } from '@nestjs/common';
import { MessageSender } from 'src/domain/enums/message-sender';
import { ChatRepository } from 'src/domain/repositories/chat.repository';
import { AddMessageToSessionUseCase } from './add-message-to-session';
import { MessageType } from 'src/domain/enums/message-type';
import { ChatMessage } from 'src/domain/entities/chat-message';
import { AnswerPropmtUseCase } from '../llm/answer-prompt';
import { AddMessageActionUseCase } from './add-message-action';
import { MessageActionType } from 'src/domain/enums/message-action-type';
import { ChatMessageAction } from 'src/domain/entities/chat-message-action';

@Injectable()
export class AddUserMessageUseCase {
  constructor(
    @Inject('ChatRepository')
    private readonly repository: ChatRepository,
    private readonly addMessageToSessionUseCase: AddMessageToSessionUseCase,
    private readonly answerPromptUseCase: AnswerPropmtUseCase,
    private readonly addMessageActionUseCase: AddMessageActionUseCase,
  ) {}

  async execute(sessionId: string, content: string): Promise<ChatMessage> {
    const aiChatMessageId = await this.repository.getAiMessageId(sessionId);

    const userMessage = await this.addMessageToSessionUseCase.execute({
      sessionId,
      content,
      sender: MessageSender.USER,
      messageType: MessageType.TEXT,
    });

    const llmAnswer = await this.answerPromptUseCase.execute(
      aiChatMessageId,
      content,
    );

    const llmMessage = await this.addMessageToSessionUseCase.execute({
      sessionId,
      content: llmAnswer.output.message,
      sender: MessageSender.ASSISTANT,
      messageType: MessageType.TEXT,
      openAiMessageId: llmAnswer.answerId,
    });
    console.log(JSON.stringify(llmAnswer));
    if (llmAnswer.output.action.type === 'suggest_carts') {
      const action = new ChatMessageAction(
        llmAnswer.output.action.type as MessageActionType,
        llmAnswer.output.action.payload.input,
        llmMessage.id,
      );
      await this.addMessageActionUseCase.execute(action);
    }

    return userMessage;
  }
}
