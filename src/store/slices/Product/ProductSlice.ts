import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Brand, Category, Filter, ProductState, ProductType } from "./types";
import Axios from "../../../helpers/axios";
import axios from "axios";

const initialState: ProductState = {
  isLoading: false,
  error: null,
  products: [],
  searchResults: [],
  searchResultsPage: 1,
  canInfiniteScrollResults: true,
  categories: [],
  brands: [],
  searchFilters: {
    category: { label: "Tümü", value: "" },
    brand: { label: "Tümü", value: "" },
    minPrice: 0,
    maxPrice: 0,
    sku: "",
    s: "",
    sort: { label: "Önerilen Sıralama", value: "" },
    criticalStock: 0,
  },
  product: null,
};

export const fetchHomeScreenProducts = createAsyncThunk(
  "fetchHomeScreenProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Axios.get("/admin-api/products");

      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response)
        return rejectWithValue(error.response);
    }
  }
);

export const searchProducts = createAsyncThunk(
  "searchProducts",
  async (
    data: { s: string; sort: string; page: number },
    { rejectWithValue }
  ) => {
    try {
      const queryParams = new URLSearchParams();
      for (let [key, value] of Object.entries(data)) {
        if (value) {
          queryParams.append(key, String(value));
        }
      }

      let reqUrl = `/admin-api/products?${queryParams.toString()}&limit=10`;

      const response = await Axios.get(reqUrl);

      return { products: response.data, page: data.page };
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response)
        return rejectWithValue(error.response);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Axios.get("/admin-api/categories");

      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response)
        return rejectWithValue(error.response);
    }
  }
);

export const fetchBrands = createAsyncThunk(
  "fetchBrands",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Axios.get("/admin-api/brands");

      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response)
        return rejectWithValue(error.response);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "fetchProductById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`/admin-api/products/${id}`);

      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response)
        return rejectWithValue(error.response);
    }
  }
);

const ProductSlice = createSlice({
  name: "ProductSlice",
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.searchResultsPage = 1;
      state.canInfiniteScrollResults = true;
      state.searchFilters = {
        category: { label: "Tümü", value: "" },
        brand: { label: "Tümü", value: "" },
        minPrice: 0,
        maxPrice: 0,
        sku: "",
        s: "",
        sort: { label: "Önerilen Sıralama", value: "" },
      };
    },
    setSearchResultsPage: (state, action: PayloadAction<number>) => {
      state.searchResultsPage = action.payload;

      if (action.payload <= 1) state.canInfiniteScrollResults = true;
    },
    setFilters_ProductSlice: (state, action: PayloadAction<any>) => {
      state.searchFilters = { ...state.searchFilters, ...action.payload };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchHomeScreenProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchHomeScreenProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchHomeScreenProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = {
          message: action.payload?.data?.message,
          status: action.payload?.status,
        };
      });

    builder
      .addCase(searchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        searchProducts.fulfilled,
        (
          state,
          action: PayloadAction<{ products: ProductType[]; page: number }>
        ) => {
          state.isLoading = false;

          if (action.payload.page > 1) {
            state.searchResults = [
              ...state.searchResults,
              ...action.payload.products,
            ];
          } else {
            state.searchResults = action.payload.products;
          }

          state.searchResultsPage = action.payload.page;
          if (action.payload.products.length == 0)
            state.canInfiniteScrollResults = false;
        }
      )
      .addCase(searchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = {
          message: action.payload?.data?.message,
          status: action.payload?.status,
        };
      });

    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.isLoading = false;
          state.categories = action.payload;
        }
      )
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = {
          message: action.payload?.data?.message,
          status: action.payload?.status,
        };
      });

    builder
      .addCase(fetchBrands.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchBrands.fulfilled,
        (state, action: PayloadAction<Brand[]>) => {
          state.isLoading = false;
          state.brands = action.payload;
        }
      )
      .addCase(fetchBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.error = {
          message: action.payload?.data?.message,
          status: action.payload?.status,
        };
      });

    builder
      .addCase(fetchProductById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchProductById.fulfilled,
        (state, action: PayloadAction<ProductType>) => {
          state.isLoading = false;
          state.product = action.payload;
        }
      )
      .addCase(fetchProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = {
          message: action.payload?.data?.message,
          status: action.payload?.status,
        };
      });
  },
});

export const {
  clearSearchResults,
  setSearchResultsPage,
  setFilters_ProductSlice,
} = ProductSlice.actions;
export default ProductSlice.reducer;
