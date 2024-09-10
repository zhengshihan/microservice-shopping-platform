// src/components/ProductSearch.tsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";
import { RootState, AppDispatch } from "../app/store";

const ProductSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch: AppDispatch = useDispatch();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(fetchProducts({ searchTerm })); // 调用 API 进行搜索
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Search Products</h2>
      <form onSubmit={handleSearchSubmit} className="flex space-x-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by name"
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Search
        </button>
      </form>
    </div>
  );
};

export default ProductSearch;
