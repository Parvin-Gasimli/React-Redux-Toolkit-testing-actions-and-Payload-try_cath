import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import modalReducer from "../features/modal/modalSlice";

const strore = configureStore({
  reducer: {
    cart: cartReducer,
    modal: modalReducer,
  },
});

export default strore;
