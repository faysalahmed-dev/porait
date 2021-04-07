/*
  Warnings:

  - The `password_reset_token` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email_verify_token" TEXT NOT NULL DEFAULT E'',
DROP COLUMN "password_reset_token",
ADD COLUMN     "password_reset_token" JSONB;
