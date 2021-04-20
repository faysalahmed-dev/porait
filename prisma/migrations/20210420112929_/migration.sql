/*
  Warnings:

  - You are about to drop the column `images` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "images";

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "avater" TEXT NOT NULL,
    "uploaded" TEXT[],
    "cover" TEXT NOT NULL,
    "user_id" TEXT,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Image_user_id_unique" ON "Image"("user_id");

-- AddForeignKey
ALTER TABLE "Image" ADD FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
