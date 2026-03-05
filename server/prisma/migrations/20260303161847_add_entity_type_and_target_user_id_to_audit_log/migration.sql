/*
  Warnings:

  - The `entity_type` column on the `audit_logs` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `user_id` on table `audit_logs` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "EntityType" AS ENUM ('WORKSPACE', 'ROLE', 'WORKSPACE_MEMBER', 'LINK', 'INVITE_LINK');

-- AlterTable
ALTER TABLE "audit_logs" ADD COLUMN     "target_user_id" TEXT,
ALTER COLUMN "user_id" SET NOT NULL,
DROP COLUMN "entity_type",
ADD COLUMN     "entity_type" "EntityType";

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_target_user_id_fkey" FOREIGN KEY ("target_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
