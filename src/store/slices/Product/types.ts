export interface ProductState {
  isLoading: boolean;
  error: { message: null | string; status: null | number } | null;
  products: any[];
}
