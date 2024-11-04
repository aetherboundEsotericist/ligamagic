/*
  Warnings:

  - A unique constraint covering the columns `[wishcardId]` on the table `BuyCard` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "BuyCard" ADD COLUMN     "wishcardId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "BuyCard_wishcardId_key" ON "BuyCard"("wishcardId");

-- AddForeignKey
ALTER TABLE "BuyCard" ADD CONSTRAINT "BuyCard_wishcardId_fkey" FOREIGN KEY ("wishcardId") REFERENCES "WishCard"("id") ON DELETE SET NULL ON UPDATE CASCADE;
