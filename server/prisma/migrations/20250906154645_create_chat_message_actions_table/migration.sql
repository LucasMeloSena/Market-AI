-- CreateEnum
CREATE TYPE "public"."ActionType" AS ENUM ('SUGGEST_CARTS');

-- CreateTable
CREATE TABLE "public"."ChatMessageActions" (
    "id" TEXT NOT NULL,
    "actionType" "public"."ActionType" NOT NULL,
    "payload" JSONB NOT NULL,
    "chatMessageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "confirmedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "executedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatMessageActions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChatMessageActions_chatMessageId_actionType_key" ON "public"."ChatMessageActions"("chatMessageId", "actionType");

-- AddForeignKey
ALTER TABLE "public"."ChatMessageActions" ADD CONSTRAINT "ChatMessageActions_chatMessageId_fkey" FOREIGN KEY ("chatMessageId") REFERENCES "public"."ChatMessages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
