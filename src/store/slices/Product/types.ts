export interface ProductState {
  isLoading: boolean;
  error: { message: null | string; status: null | number } | null;
  products: ProductType[];
}

export interface ProductType {
  id: number;
  images: string[];
  name: string;
  stockAmount: number;
  createdAt: Date;
  taxIncluded: number;
  price1: number;
  currency: { id: number; abbr: string; label: string };
  tax: number;
  hasGift: number;
  discount: number;
  discountType: number;
  stockTypeLabel: string;
}
