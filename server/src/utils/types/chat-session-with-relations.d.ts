import { Prisma } from 'generated/prisma';

export type ChatSessionWithRelations = Prisma.ChatSessionsGetPayload<{
  include: {
    ChatMessages: {
      include: {
        ChatMessageActions: true;
      };
    };
  };
}>;
