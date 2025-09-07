import { Prisma } from 'generated/prisma';

export type ChatMessageWithRelations = Prisma.ChatMessagesGetPayload<{
  include: {
    ChatMessageActions: true;
  };
}>;
