import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type UiState = {
  mobileMenuOpen: boolean;
  commandOpen: boolean;
};

const initialState: UiState = {
  mobileMenuOpen: false,
  commandOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setMobileMenuOpen(state, action: PayloadAction<boolean>) {
      state.mobileMenuOpen = action.payload;
    },
    setCommandOpen(state, action: PayloadAction<boolean>) {
      state.commandOpen = action.payload;
    },
  },
});

export const { setMobileMenuOpen, setCommandOpen } = uiSlice.actions;
export default uiSlice.reducer;

