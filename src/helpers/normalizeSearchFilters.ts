import { Filter } from "../store/slices/Product/types";

export default function normalizeSearchFilters(filters: Filter): {
  category: string;
  brand: string;
  sort: string;
  minPrice: string;
  maxPrice: string;
  sku: string;
  s: string;
} {
  const normalizedSearchFilters = JSON.parse(JSON.stringify(filters));
  // return only ids of option fields
  for (let key in normalizedSearchFilters) {
    if (normalizedSearchFilters[key]?.label) {
      normalizedSearchFilters[key] = String(
        normalizedSearchFilters[key].value || ""
      );
    }
  }

  return normalizedSearchFilters;
}
