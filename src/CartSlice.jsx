import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;

      const existingItem = state.cartItems.find(
        (item) => item.name === newItem.name
      );

      state.totalQuantity++;

      if (!existingItem) {
        state.cartItems.push({
          ...newItem,
          quantity: 1,
        });
      } else {
        existingItem.quantity++;
      }

      // update total amount
      state.totalAmount += parseFloat(newItem.cost.replace('$', ''));
    },

    removeItem: (state, action) => {
      const name = action.payload;

      const existingItem = state.cartItems.find(
        (item) => item.name === name
      );

      if (!existingItem) return;

      state.totalQuantity -= existingItem.quantity;

      state.totalAmount -=
        parseFloat(existingItem.cost.replace('$', '')) *
        existingItem.quantity;

      state.cartItems = state.cartItems.filter(
        (item) => item.name !== name
      );
    },
    increaseQty: (state, action) => {
      const name = action.payload;

      const item = state.cartItems.find((item) => item.name === name);

      if (item) {
        item.quantity++;
        state.totalQuantity++;
        state.totalAmount += parseFloat(item.cost.replace('$', ''));
      }
    },

    decreaseQty: (state, action) => {
      const name = action.payload;

      const item = state.cartItems.find((item) => item.name === name);

      if (!item) return;

      item.quantity--;
      state.totalQuantity--;
      state.totalAmount -= parseFloat(item.cost.replace('$', ''));

      if (item.quantity === 0) {
        state.cartItems = state.cartItems.filter(
          (i) => i.name !== name
        );
      }
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export const {
  addItem,
  removeItem,
  increaseQty,
  decreaseQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;