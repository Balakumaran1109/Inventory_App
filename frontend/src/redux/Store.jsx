import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../redux/features/auth/AuthSlice";
import productReducer from "../redux/features/product/ProductSlice"
import filterReducer from "../redux/features/product/FilterSlice"

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    product: productReducer,
    filter: filterReducer
  },
});
