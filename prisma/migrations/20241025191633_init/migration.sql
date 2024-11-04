/*
  Warnings:

  - A unique constraint covering the columns `[wishcardId]` on the table `BuyCard` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `wishcardId` to the `BuyCard` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BuyCard" DROP CONSTRAINT "BuyCard_id_fkey";

-- AlterTable
ALTER TABLE "BuyCard" ADD COLUMN     "wishcardId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "BuyCard_wishcardId_key" ON "BuyCard"("wishcardId");

-- AddForeignKey
ALTER TABLE "BuyCard" ADD CONSTRAINT "BuyCard_wishcardId_fkey" FOREIGN KEY ("wishcardId") REFERENCES "WishCard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
