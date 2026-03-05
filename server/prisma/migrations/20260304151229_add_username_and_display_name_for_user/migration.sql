-- AlterTable
ALTER TABLE "users" ADD COLUMN     "display_name" TEXT,
ADD COLUMN     "username" TEXT;

-- AlterTable
ALTER TABLE "workspace_members" ADD COLUMN     "display_name" TEXT;
