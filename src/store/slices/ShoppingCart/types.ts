import { ProductType } from "../Product/types";

export interface ShoppingCartState {
  items: CartItem[];
  totalPrice: number;
}

export interface CartItem {
  product: ProductType;
  quantity: number;
}
