// src/components/ProductForm.tsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../features/products/productAPI";
import { fetchProducts } from "../features/products/productSlice";
import { RootState, AppDispatch } from "../app/store";

const ProductForm: React.FC = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    eventStartTime: "",
    eventEndTime: "",
  });

  const dispatch: AppDispatch = useDispatch();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createProduct(product);
    dispatch(fetchProducts({}));
  };

  return (
    <form onSubmit={handleSubmit} className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <input
        type="text"
        name="name"
        value={product.name}
        onChange={handleChange}
        placeholder="Name"
        className="border p-2 mb-4 w-full"
        required
      />
      <textarea
        name="description"
        value={product.description}
        onChange={handleChange}
        placeholder="Description"
        className="border p-2 mb-4 w-full"
        required
      />
      <input
        type="number"
        name="price"
        value={product.price}
        onChange={handleChange}
        placeholder="Price"
        className="border p-2 mb-4 w-full"
        required
      />
      <input
        type="datetime-local"
        name="eventStartTime"
        value={product.eventStartTime}
        onChange={handleChange}
        className="border p-2 mb-4 w-full"
        required
      />
      <input
        type="datetime-local"
        name="eventEndTime"
        value={product.eventEndTime}
        onChange={handleChange}
        className="border p-2 mb-4 w-full"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Save Product
      </button>
    </form>
  );
};

export default ProductForm;
