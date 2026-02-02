-- DropForeignKey
ALTER TABLE "user_providers" DROP CONSTRAINT "user_providers_user_id_fkey";

-- AddForeignKey
ALTER TABLE "user_providers" ADD CONSTRAINT "user_providers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
