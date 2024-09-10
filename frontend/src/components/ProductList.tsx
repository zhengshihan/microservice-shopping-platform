// src/components/ProductList.tsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";
import { RootState, AppDispatch } from "../app/store";
import ProductSearch from "./ProductSearch";
import ProductFilter from "./ProductFilter";
import { store } from "../app/store";
import { useNavigate } from "react-router-dom";
import Chatbot from "./Chatbot";

const ProductList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) => state.product.products);
  const status = useSelector((state: RootState) => state.product.status);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts({}));
    }
  }, [status, dispatch]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      <ProductSearch />
      <ProductFilter />
      {status === "loading" ? (
        <p>Loading...</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {products.map((product) => (
            <li
              key={product.id}
              className="border border-gray-200 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {product.name}
              </h3>
              <p className="text-lg text-gray-700 mb-4">
                ${product.price.toFixed(2)}
              </p>

              <p className="text-gray-500 mb-4">{product.description}</p>

              <div className="text-sm text-gray-400">
                <p>
                  <span className="font-semibold">Event Start:</span>{" "}
                  {new Date(product.eventStartTime).toLocaleString()}
                </p>
                <p>
                  <span className="font-semibold">Event End:</span>{" "}
                  {new Date(product.eventEndTime).toLocaleString()}
                </p>
              </div>

              <button
                onClick={() => navigate(`/product/${product.id}`)}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
              >
                Detail
              </button>
            </li>
          ))}
        </ul>
      )}
      <Chatbot />
    </div>
  );
};

export default ProductList;
