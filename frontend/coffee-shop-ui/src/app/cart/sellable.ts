export type SellableKind = 'PRODUCT' | 'BEAN';

export interface SellableItem {
  id: number;
  name: string;
  priceCents: number;
  imageUrl?: string | null;
  kind: 'PRODUCT' | 'BEAN';

  meta?: {
    origin?: string | null;
    roast?: string | null;
  };
}
