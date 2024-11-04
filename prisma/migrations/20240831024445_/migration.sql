/*
  Warnings:

  - You are about to drop the column `cardName` on the `BuyCard` table. All the data in the column will be lost.
  - Added the required column `name` to the `BuyCard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BuyCard" DROP COLUMN "cardName",
ADD COLUMN     "name" TEXT NOT NULL;
