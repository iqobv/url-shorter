/*
  Warnings:

  - You are about to drop the column `favicon` on the `links` table. All the data in the column will be lost.
  - Added the required column `domain` to the `links` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "links" DROP COLUMN "favicon",
ADD COLUMN     "domain" TEXT NOT NULL;
