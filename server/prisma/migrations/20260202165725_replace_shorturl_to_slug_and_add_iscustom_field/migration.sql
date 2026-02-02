/*
  Warnings:

  - You are about to drop the column `short_url` on the `links` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `links` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `links` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "links_short_url_key";

-- AlterTable
ALTER TABLE "links" DROP COLUMN "short_url",
ADD COLUMN     "is_custom" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "links_slug_key" ON "links"("slug");
