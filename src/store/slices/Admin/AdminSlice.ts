import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminState } from "./types";
import Axios from "../../../helpers/axios";
import axios from "axios";
import { Category, ProductType } from "../Product/types";
import Toast from "react-native-toast-message";

const initialState: AdminState = {
  products: [],
  categories: [],
  isLoading: false,
  error: null,
};

export const fetchAdminPanelProducts = createAsyncThunk(
  "fetchAdminPanelProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        "/admin-api/products?sort=-homeSortOrder"
      );

      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response)
        return rejectWithValue(error.response);
    }
  }
);

export const fetchAdminPanelCategories = createAsyncThunk(
  "fetchAdminPanelCategories",
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

export const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async (id: string, { rejectWithValue }) => {
    try {
      await Axios.delete(`/admin-api/products/${id}`);

      Toast.show({ type: "success", text1: "Ürün başarıyla silindi." });
      return id;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response)
        return rejectWithValue(error.response);
    }
  }
);

export const createProduct = createAsyncThunk(
  "createProduct",
  async (data: ProductType, { rejectWithValue }) => {
    try {
      const response = await Axios.post(`/admin-api/products`, data);

      Toast.show({ type: "success", text1: "Ürün başarıyla oluşturuldu." });
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response)
        return rejectWithValue(error.response);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "updateProduct",
  async (data: ProductType, { rejectWithValue }) => {
    try {
      const response = await Axios.put(`/admin-api/products/${data.id}`, data);

      Toast.show({ type: "success", text1: "Ürün başarıyla güncellendi." });
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response)
        return rejectWithValue(error.response);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminPanelProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchAdminPanelProducts.fulfilled,
        (state, action: PayloadAction<ProductType[]>) => {
          state.isLoading = false;
          state.products = action.payload;
        }
      )
      .addCase(fetchAdminPanelProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = {
          message: action.payload?.data?.message,
          status: action.payload?.status,
        };
      });

    builder
      .addCase(fetchAdminPanelCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchAdminPanelCategories.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.isLoading = false;
          state.categories = action.payload;
        }
      )
      .addCase(fetchAdminPanelCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = {
          message: action.payload?.data?.message,
          status: action.payload?.status,
        };
      });

    builder
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        deleteProduct.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.products = state.products.filter(
            (item) => item.id.toString() != action.payload.toString()
          );
        }
      )
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = {
          message: action.payload?.data?.message,
          status: action.payload?.status,
        };
      });

    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        createProduct.fulfilled,
        (state, action: PayloadAction<ProductType>) => {
          state.isLoading = false;
          state.products = [action.payload, ...state.products];
        }
      )
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = {
          message: action.payload?.data?.message,
          status: action.payload?.status,
        };
      });

    builder
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        updateProduct.fulfilled,
        (state, action: PayloadAction<ProductType>) => {
          state.isLoading = false;
          state.products = state.products.map((item) =>
            item.id == action.payload.id ? action.payload : item
          );
        }
      )
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = {
          message: action.payload?.data?.message,
          status: action.payload?.status,
        };
      });
  },
});

export const {} = adminSlice.actions;
export default adminSlice.reducer;
