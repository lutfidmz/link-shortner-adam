/*
  Warnings:

  - A unique constraint covering the columns `[short_url]` on the table `links` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "links_short_url_key" ON "links"("short_url");
