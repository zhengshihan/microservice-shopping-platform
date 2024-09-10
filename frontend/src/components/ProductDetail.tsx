// src/components/ProductDetail.tsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";
import { fetchInventories } from "../features/inventory/inventorySlice";
import { RootState, AppDispatch } from "../app/store";
import axios from "axios";

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) => state.product.products);
  const status = useSelector((state: RootState) => state.product.status);
  const product = products.find((product) => product.id === productId);
  const inventories = useSelector(
    (state: RootState) => state.inventory.inventories
  );
  const inventory = inventories.find((inv) => inv.name === product?.name);

  const [quantity, setQuantity] = useState<number>(1); // 状态来保存产品数量

  useEffect(() => {
    dispatch(fetchProducts({}));
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchInventories());
  }, [dispatch]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }
  const getAccessTokenFromStorage = (): string | null => {
    //   const user = localStorage.getItem('oidc.user:http://localhost:8181/realms/react-reaml:react-login-client'); // 根据实际存储的 key

    const user = sessionStorage.getItem(
      "oidc.user:http://localhost:8181/realms/react-reaml:react-login-client"
    );
    if (user) {
      const parsedUser = JSON.parse(user);
      return parsedUser.access_token || null; // 获取 access_token
    }
    return null; // 如果没有找到 token，返回 null
  };

  // 处理订单提交逻辑
  const handleOrder = async () => {
    const token = getAccessTokenFromStorage();

    // 设置请求头
    const headers = {
      Authorization: token ? `Bearer ${token}` : undefined,
    };
    const user = sessionStorage.getItem(
      "oidc.user:http://localhost:8181/realms/react-reaml:react-login-client"
    );
    if (user) {
      const parsedUser = JSON.parse(user);
      try {
        const orderData = {
          eventName: product.name,
          price: product.price,
          quantity: quantity,
          userDetails: {
            email: parsedUser.profile.email,
            firstName: parsedUser.profile.given_name,
            lastName: parsedUser.profile.family_name,
          },
        };

        const response = await axios.post(
          "http://localhost:8060/api/order",
          orderData,
          { headers }
        );

        if (response.status === 200 || response.status === 201) {
          alert(`Order placed for ${quantity} ${product.name}(s)!`);
        } else {
          alert("Failed to place order.");
        }
      } catch (error) {
        console.error("Error placing order:", error);
        alert("Error placing order. Please try again.");
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">{product.name}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 左侧: 产品详情 */}
        <div>
          <p className="text-lg text-gray-700 mt-4 mb-2">
            ${product.price.toFixed(2)}
          </p>
          <p className="mb-4 text-gray-600">{product.description}</p>

          <div className="text-sm text-gray-500 mb-4">
            <p>
              <span className="font-semibold">Event Start:</span>{" "}
              {new Date(product.eventStartTime).toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">Event End:</span>{" "}
              {new Date(product.eventEndTime).toLocaleString()}
            </p>
          </div>

          {/* 显示库存信息 */}
          <p className="text-lg font-medium text-red-500">
            Available Inventory: {inventory ? inventory.quantity : "N/A"}
          </p>
        </div>

        {/* 右侧: 数量选择和订单按钮 */}
        <div>
          <div className="mb-6">
            <label
              htmlFor="quantity"
              className="block text-gray-700 text-lg font-medium mb-2"
            >
              Select Quantity:
            </label>
            <input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value) || 1))
              }
              className="w-20 p-2 border border-gray-300 rounded-md text-lg"
              min="1"
            />
          </div>

          <button
            onClick={handleOrder}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
