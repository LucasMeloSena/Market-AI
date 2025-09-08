-- AlterTable
ALTER TABLE "public"."ChatMessageActions" ALTER COLUMN "confirmedAt" DROP DEFAULT,
ALTER COLUMN "executedAt" DROP DEFAULT;
