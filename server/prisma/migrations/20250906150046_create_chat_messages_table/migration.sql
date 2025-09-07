-- CreateEnum
CREATE TYPE "public"."Sender" AS ENUM ('USER', 'ASSISTANT');

-- CreateEnum
CREATE TYPE "public"."MessageType" AS ENUM ('TEXT', 'SUGGEST_CARTS_RESULT');

-- CreateTable
CREATE TABLE "public"."ChatMessages" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "sender" "public"."Sender" NOT NULL,
    "openAiMessageId" TEXT NOT NULL,
    "messageType" "public"."MessageType" NOT NULL DEFAULT 'TEXT',
    "chatSessionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatMessages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChatMessages_openAiMessageId_key" ON "public"."ChatMessages"("openAiMessageId");

-- AddForeignKey
ALTER TABLE "public"."ChatMessages" ADD CONSTRAINT "ChatMessages_chatSessionId_fkey" FOREIGN KEY ("chatSessionId") REFERENCES "public"."ChatSessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
