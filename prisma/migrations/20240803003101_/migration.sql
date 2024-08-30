-- DropForeignKey
ALTER TABLE "BuyCard" DROP CONSTRAINT "BuyCard_orderId_fkey";

-- DropForeignKey
ALTER TABLE "WishCard" DROP CONSTRAINT "WishCard_orderId_fkey";

-- AddForeignKey
ALTER TABLE "WishCard" ADD CONSTRAINT "WishCard_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuyCard" ADD CONSTRAINT "BuyCard_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
