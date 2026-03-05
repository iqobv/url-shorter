-- AlterTable
ALTER TABLE "audit_logs" ADD COLUMN     "actor_name" TEXT,
ALTER COLUMN "user_id" DROP NOT NULL;
