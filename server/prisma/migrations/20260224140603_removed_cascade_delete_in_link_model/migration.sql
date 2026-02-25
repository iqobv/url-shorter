-- DropForeignKey
ALTER TABLE "links" DROP CONSTRAINT "links_user_id_fkey";

-- AddForeignKey
ALTER TABLE "links" ADD CONSTRAINT "links_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
