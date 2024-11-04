import { BuyCard, WishCard } from '@prisma/client';

export type Order = {
  id: number;
  orderNumber: number;
};

export type AssignmentList = {
  wishcard: WishCard;
  buycard: BuyCard;
}[];

export type WishBuyAttribution = {
  wishcardId: number;
  buycardId: number;
};
