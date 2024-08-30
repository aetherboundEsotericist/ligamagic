export type WishCard = {
  id: number;
  name: string;
  edition: string | null;
  quality: number;
  quantity: number;
  personId: number;
  orderId: number;
};

export type WishCardCreationInput = {
  name: string;
  quantity: number;
  edition?: string;
  quality?: number;
};

export type WishlistCreationInput = {
  personId: number;
  orderId: number;
  cards: WishCardCreationInput[];
};
