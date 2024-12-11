import { Option } from "../../../components/SearchScreen/CustomSelect";

export interface ProductState {
  isLoading: boolean;
  error: { message: null | string; status: null | number } | null;
  products: ProductType[];
  searchResults: ProductType[];
  searchResultsPage: number;
  canInfiniteScrollResults: boolean;
  categories: Category[];
  brands: Brand[];
  searchFilters: Filter;
  product: ProductType | null;
}

export interface Filter {
  category: Option;
  brand: Option;
  sort: Option;
  minPrice: number;
  maxPrice: number;
  sku: string;
  s: string;
  criticalStock: number;
}

export interface Brand {
  name: string;
  id: number;
}

export interface Category {
  name: string;
  id: number;
}

export interface ProductType {
  id: number;
  images?: string[];
  name: string;
  stockAmount: number;
  createdAt?: Date;
  taxIncluded: number;
  price1: number;
  currency: { id: number; abbr?: string; label?: string };
  tax: number;
  hasGift: number;
  discount: number;
  discountType: number;
  stockTypeLabel: string;
  warranty: string;
  moneyOrderDiscount: number;
  detail: { details: string };
  sku: string;
  barcode: string;
  status: number;
  shortDetails: string;
  searchKeywords: string;
  metaKeywords: string;
  metaDescription: string;
  gift: string;
}
