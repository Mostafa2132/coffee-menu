import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { OrderItem } from "@/types/models";

interface CartState {
  items: OrderItem[];
  isOpen: boolean;
}

const initialState: CartState = {
  items: [],
  isOpen: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
    addItem: (state, action: PayloadAction<OrderItem>) => {
      const existingItem = state.items.find(
        (i) => i.product_id === action.payload.product_id && i.size === action.payload.size
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<{ product_id: string; size?: string }>) => {
      state.items = state.items.filter(
        (i) => !(i.product_id === action.payload.product_id && i.size === action.payload.size)
      );
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ product_id: string; size?: string; quantity: number }>
    ) => {
      const item = state.items.find(
        (i) => i.product_id === action.payload.product_id && i.size === action.payload.size
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  toggleCart,
  openCart,
  closeCart,
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
