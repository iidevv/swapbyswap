/*
  Warnings:

  - Added the required column `condition` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `swapDownPrice` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `swapUpPrice` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `views` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ItemStatus" AS ENUM ('PENDING', 'ACTIVE', 'INACTIVE', 'COMPLETED');

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "condition" INTEGER NOT NULL,
ADD COLUMN     "status" "ItemStatus" NOT NULL,
ADD COLUMN     "swapDownPrice" INTEGER NOT NULL,
ADD COLUMN     "swapUpPrice" INTEGER NOT NULL,
ADD COLUMN     "views" INTEGER NOT NULL;
