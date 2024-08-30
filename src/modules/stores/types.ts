export type Store = {
  id: number;
  name: string;
  website: string | null;
};

export type StoreCreationInput = {
  name: string;
  website?: string;
};

export type StoreEditionInput = {
  id: number;
  name?: string;
  website?: string;
};
