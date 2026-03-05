/*
  Warnings:

  - You are about to drop the column `role_id` on the `workspace_members` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "workspace_members" DROP CONSTRAINT "workspace_members_role_id_fkey";

-- AlterTable
ALTER TABLE "workspace_members" DROP COLUMN "role_id",
ADD COLUMN     "permissions" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- CreateTable
CREATE TABLE "member_roles" (
    "member_id" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "member_roles_pkey" PRIMARY KEY ("member_id","role_id")
);

-- AddForeignKey
ALTER TABLE "member_roles" ADD CONSTRAINT "member_roles_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "workspace_members"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "member_roles" ADD CONSTRAINT "member_roles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
