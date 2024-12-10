import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductState } from "./types";
import Axios from "../../../helpers/axios";
import axios from "axios";

const initialState: ProductState = {
  isLoading: false,
  error: null,
  products: [],
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

const ProductSlice = createSlice({
  name: "ProductSlice",
  initialState,
  reducers: {},
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
  },
});

export const {} = ProductSlice.actions;
export default ProductSlice.reducer;
