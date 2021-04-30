/*
  Warnings:

  - The values [DISLIKE] on the enum `PostReactType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PostReactType_new" AS ENUM ('LIKE', 'UNLIKE');
ALTER TABLE "PostReact" ALTER COLUMN "type" TYPE "PostReactType_new" USING ("type"::text::"PostReactType_new");
ALTER TYPE "PostReactType" RENAME TO "PostReactType_old";
ALTER TYPE "PostReactType_new" RENAME TO "PostReactType";
DROP TYPE "PostReactType_old";
COMMIT;
