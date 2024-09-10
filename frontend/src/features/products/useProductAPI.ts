// src/hooks/useProductApi.ts
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from "../../app/store";
import { Product } from '../../features/products/productTypes';

const API_URL = 'http://localhost:8060/api/product';

const useProductApi = () => {
  const token = useSelector((state: RootState) => state.auth.user?.accessToken);
  console.log(token);

  const fetchProducts = async (filters: { searchTerm?: string; minPrice?: number; maxPrice?: number }): Promise<Product[]> => {
    const params = new URLSearchParams();

    // 处理过滤条件
    if (filters.searchTerm) {
      params.append('name', filters.searchTerm);
    }
    
    if (filters.minPrice !== undefined) {
      params.append('min', filters.minPrice.toString());
    }
    
    if (filters.maxPrice !== undefined) {
      params.append('max', filters.maxPrice.toString());
    }

    // 设置请求头
    const headers = {
      Authorization: token ? `Bearer ${token}` : undefined,
    };

    try {
      const response = await axios.get(filters.searchTerm ? `${API_URL}/search` : API_URL, { params, headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  };

  return { fetchProducts };
};

export default useProductApi;
