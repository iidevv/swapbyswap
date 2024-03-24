/*
  Warnings:

  - You are about to drop the column `swapDownPrice` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `swapUpPrice` on the `Item` table. All the data in the column will be lost.
  - Added the required column `latitude` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceDowngrade` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceUpgrade` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "swapDownPrice",
DROP COLUMN "swapUpPrice",
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "priceDowngrade" INTEGER NOT NULL,
ADD COLUMN     "priceUpgrade" INTEGER NOT NULL;
