-- AlterTable
ALTER TABLE "public"."ChatMessageActions" ALTER COLUMN "confirmedAt" DROP NOT NULL,
ALTER COLUMN "executedAt" DROP NOT NULL;
