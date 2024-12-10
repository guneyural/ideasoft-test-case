import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, ShoppingCartState } from "./types";
import { ProductType } from "../Product/types";
import { calculateDiscountedPriceAsNumber } from "../../../helpers/priceCalculator";
import Toast from "react-native-toast-message";

const initialState: ShoppingCartState = {
  items: [],
  totalPrice: 0,
};

export const calculateTotalPrice = (items: CartItem[]): number => {
  return items.reduce((total, item) => {
    const product = item.product;

    let finalPrice =
      product.taxIncluded == 1
        ? product.price1
        : product.price1 + (product.price1 * product.tax) / 100;

    if (product.discount > 0) {
      finalPrice = calculateDiscountedPriceAsNumber(
        product.price1,
        product.discount,
        product.discountType,
        product.tax,
        product.taxIncluded
      );
    }

    return total + finalPrice * item.quantity;
  }, 0);
};

const shoppingCartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductType>) => {
      const product = action.payload;
      const existingItem = state.items.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        if (existingItem.quantity < product.stockAmount) {
          existingItem.quantity += 1;
        }
      } else {
        state.items.push({ product, quantity: 1 });
      }

      state.totalPrice = calculateTotalPrice(state.items);

      Toast.show({ type: "success", text1: "Ürün sepetinize eklendi!" });
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.product.id !== productId);

      state.totalPrice = calculateTotalPrice(state.items);

      Toast.show({ type: "success", text1: "Ürün sepetinizden kaldırıldı." });
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ productId: number; quantity: number }>
    ) => {
      const { productId, quantity } = action.payload;
      const existingItem = state.items.find(
        (item) => item.product.id === productId
      );

      if (existingItem) {
        if (quantity > 0) {
          if (quantity >= existingItem.product.stockAmount)
            Toast.show({
              type: "error",
              text1: "Bu üründen stokta yeterli adet yok.",
            });

          if (quantity <= existingItem.product.stockAmount)
            existingItem.quantity = quantity;
        } else if (quantity === 0) {
          state.items = state.items.filter(
            (item) => item.product.id !== productId
          );
        }
      }

      state.totalPrice = calculateTotalPrice(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;

      Toast.show({ type: "success", text1: "Sepetiniz boşaltıldı." });
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
