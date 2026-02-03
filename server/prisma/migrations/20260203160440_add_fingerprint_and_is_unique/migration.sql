-- AlterTable
ALTER TABLE "clicks" ADD COLUMN     "fingerprint" TEXT,
ADD COLUMN     "is_unique" BOOLEAN NOT NULL DEFAULT false;
