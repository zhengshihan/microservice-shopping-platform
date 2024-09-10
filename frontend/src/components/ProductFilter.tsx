// src/components/ProductFilter.tsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";
import { RootState, AppDispatch } from "../app/store";

const ProductFilter: React.FC = () => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const dispatch: AppDispatch = useDispatch();

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(parseFloat(value));
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(parseFloat(value));
  };

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(fetchProducts({ minPrice, maxPrice })); // 调用 API 进行筛选
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Filter Products by Price</h2>
      <form onSubmit={handleFilterSubmit} className="flex space-x-4">
        <input
          type="number"
          value={minPrice}
          onChange={handleMinPriceChange}
          placeholder="Min Price"
          className="border p-2 w-full"
        />
        <input
          type="number"
          value={maxPrice}
          onChange={handleMaxPriceChange}
          placeholder="Max Price"
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          Apply
        </button>
      </form>
    </div>
  );
};

export default ProductFilter;
