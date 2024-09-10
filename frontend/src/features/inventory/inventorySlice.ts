// src/features/products/productSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Inventory } from './inventoryTypes';
import * as inventoryAPI from './inventoryAPI';

interface InventoryState {
  inventories: Inventory[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: InventoryState = {
  inventories: [],
  status: 'idle',
  error: null,
};

export const fetchInventories = createAsyncThunk(
  'inventorys/fetchInventories',
  async () => {
    const inventories = await inventoryAPI.fetchInventories();
    return inventories;
  }
);

export const inventorySlice = createSlice({
  name: 'inventories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInventories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.inventories = action.payload;
      })
      .addCase(fetchInventories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export default inventorySlice.reducer;
