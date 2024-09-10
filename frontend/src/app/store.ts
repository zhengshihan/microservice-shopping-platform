// src/app/store.ts
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productReducer from '../features/products/productSlice';
import authReducer from '../features//auth/authSlice';
import inventoryReducer from "../features/inventory/inventorySlice"

export  const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    inventory:inventoryReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
