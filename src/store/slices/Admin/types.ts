import { Category, ProductType } from "../Product/types";

export interface AdminState {
  products: ProductType[];
  categories: Category[];
  isLoading: boolean;
  error: { message: string | null; status: number | null } | null;
}
