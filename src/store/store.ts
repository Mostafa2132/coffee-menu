import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "@/features/ui/uiSlice";
import favoritesReducer from "@/features/favorites/favoritesSlice";
import cartReducer from "@/features/cart/cartSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      ui: uiReducer,
      favorites: favoritesReducer,
      cart: cartReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

