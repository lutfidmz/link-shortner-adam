-- CreateEnum
CREATE TYPE "enumAccesses" AS ENUM ('PUBLIC', 'INVITED');

-- CreateTable
CREATE TABLE "users" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "email" STRING NOT NULL,
    "password" STRING NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "links" (
    "id" STRING NOT NULL,
    "title" STRING NOT NULL,
    "long_url" STRING NOT NULL,
    "short_url" STRING NOT NULL,
    "password" STRING,
    "access" "enumAccesses" NOT NULL DEFAULT 'PUBLIC',
    "owner_id" STRING NOT NULL,

    CONSTRAINT "links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "members" (
    "id" STRING NOT NULL,
    "email" STRING NOT NULL,
    "link_id" STRING NOT NULL,

    CONSTRAINT "members_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "links" ADD CONSTRAINT "links_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "members" ADD CONSTRAINT "members_link_id_fkey" FOREIGN KEY ("link_id") REFERENCES "links"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

