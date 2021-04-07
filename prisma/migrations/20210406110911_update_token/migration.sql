/*
  Warnings:

  - You are about to drop the column `address` on the `Token` table. All the data in the column will be lost.
  - You are about to drop the column `device` on the `Token` table. All the data in the column will be lost.
  - Made the column `token` on table `Token` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Token" DROP COLUMN "address",
DROP COLUMN "device",
ADD COLUMN     "details" TEXT,
ADD COLUMN     "agent" JSONB,
ALTER COLUMN "ip_address" DROP NOT NULL,
ALTER COLUMN "ip_address" SET DATA TYPE TEXT,
ALTER COLUMN "token" SET NOT NULL;
