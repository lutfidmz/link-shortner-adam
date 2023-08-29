/*
  Warnings:

  - A unique constraint covering the columns `[id,short_url]` on the table `links` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "links" DROP CONSTRAINT "links_owner_id_fkey";

-- AlterTable
ALTER TABLE "links" ADD COLUMN     "expired_at" DATE;

-- CreateIndex
CREATE UNIQUE INDEX "links_id_short_url_key" ON "links"("id", "short_url");

-- AddForeignKey
ALTER TABLE "links" ADD CONSTRAINT "links_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
