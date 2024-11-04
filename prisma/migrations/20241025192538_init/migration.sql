/*
  Warnings:

  - You are about to drop the column `wishcardId` on the `BuyCard` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "BuyCard" DROP CONSTRAINT "BuyCard_wishcardId_fkey";

-- DropIndex
DROP INDEX "BuyCard_wishcardId_key";

-- AlterTable
ALTER TABLE "BuyCard" DROP COLUMN "wishcardId";
