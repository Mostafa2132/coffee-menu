import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type FavoritesState = {
  productIds: string[];
};

const initialState: FavoritesState = {
  productIds: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<string>) {
      const id = action.payload;
      const exists = state.productIds.includes(id);
      state.productIds = exists
        ? state.productIds.filter((x) => x !== id)
        : [...state.productIds, id];
    },
    setFavorites(state, action: PayloadAction<string[]>) {
      state.productIds = action.payload;
    },
    clearFavorites(state) {
      state.productIds = [];
    },
  },
});

export const { toggleFavorite, setFavorites, clearFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;

