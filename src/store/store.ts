import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "@react-native-async-storage/async-storage";

import ProductSlice from "./slices/Product/ProductSlice";
import ShoppingCartSlice from "./slices/ShoppingCart/ShoppingCartSlice";
import AdminSlice from "./slices/Admin/AdminSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  ShoppingCart: persistReducer(persistConfig, ShoppingCartSlice),
  Product: ProductSlice,
  Admin: AdminSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
