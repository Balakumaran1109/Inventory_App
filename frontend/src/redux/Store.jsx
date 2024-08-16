import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../redux/features/auth/AuthSlice";
import productReducer from "./features/auth/product/productSlice";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    product: productReducer,
  },
});
