/*
  Warnings:

  - Added the required column `post_id` to the `CommentLike` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CommentLike" ADD COLUMN     "post_id" TEXT NOT NULL;
