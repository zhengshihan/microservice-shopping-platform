// src/features/products/productAPI.ts
import axios from 'axios';
import { Product } from './productTypes';
import { RootState } from '../../app/store'; // 导入 RootState
import { store } from '../../app/store'; // 导入 store
import { useDispatch, useSelector } from "react-redux";

const API_URL = 'http://localhost:8060/api/product';

// 获取 access token 的函数
// const getAccessTokenFromStorage = (): string | null => {
//   const user = localStorage.getItem('oidc.user:http://localhost:8181/realms/react-reaml:react-login-client'); // 根据实际存储的 key 获取 user
//   if (user) {
//     const parsedUser = JSON.parse(user);
//     return parsedUser.access_token || null; // 获取 access_token
//   }
//   return null; // 如果没有找到 token，返回 null
// };
const getAccessTokenFromStorage = (): string | null => {
//   const user = localStorage.getItem('oidc.user:http://localhost:8181/realms/react-reaml:react-login-client'); // 根据实际存储的 key 

const user = sessionStorage.getItem('oidc.user:http://localhost:8181/realms/react-reaml:react-login-client');
  if (user) {
    const parsedUser = JSON.parse(user);
    return parsedUser.access_token || null; // 获取 access_token
  }
  return null; // 如果没有找到 token，返回 null
  
};

const getAccessToken = (): string | null => {
  const state: RootState = store.getState(); // 获取 Redux 状态
  return state.auth.user?.accessToken || null; // 从 user 中获取 accessToken
};



// 发送 GET 请求获取产品
export const fetchProducts = async (filters: { searchTerm?: string; minPrice?: number; maxPrice?: number }): Promise<Product[]> => {
  const params = new URLSearchParams();
   const currentUrl = window.location.href;

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
  const token = getAccessTokenFromStorage();;

  
  // 设置请求头
  const headers = {
    Authorization: token ? `Bearer ${token}` : undefined,
  };

try {
    if (currentUrl.includes('/past')) {
      // 如果 URL 包含 "/past"，调用相应的 API
      const response = await axios.get(`${API_URL}/past`, { params, headers });
      return response.data;
    } else if (filters.searchTerm) {
      // 有 searchTerm，调用搜索 API
      const response = await axios.get(`${API_URL}/search`, { params, headers });
      return response.data;
    } else if (filters.minPrice !== undefined) {
      // 有价格过滤条件，调用价格 API
      const response = await axios.get(`${API_URL}/price`, { params, headers });
      return response.data;
    } else {
      // 两者都没有，调用默认 API
      const response = await axios.get(`${API_URL}`, { params, headers });
      return response.data;
    }

  } catch (error) {
    console.error("Error fetching products:", error);
    // 根据需要处理错误
    throw error; // 或者返回一个默认值
  }



  // 根据过滤条件调用不同的 API

};

// 根据 ID 获取产品
export const fetchProductById = async (id: string): Promise<Product> => {
  const token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJRNkNKcjVudHpnVG9oMVlWRENqR0tYT180T3cyMlE4ZnN0a2duLWc3NEZBIn0.eyJleHAiOjE3MjU0NjE2MTksImlhdCI6MTcyNTQ2MTMxOSwiYXV0aF90aW1lIjoxNzI1NDYxMzE5LCJqdGkiOiI2N2E5NTAyZi1mMjI1LTQ1MzYtODc3My04YWJhNDg2NTI0YzkiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgxODEvcmVhbG1zL3JlYWN0LXJlYW1sIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjA4YTM2YTM5LWViMjEtNGM1OS1hYzdhLTFlYzYyMzg4NWQwYSIsInR5cCI6IkJlYXJlciIsImF6cCI6InJlYWN0LWxvZ2luLWNsaWVudCIsInNlc3Npb25fc3RhdGUiOiJiYjM0MGM2OS00NTZkLTQzYWEtODBhNi1kMWMwYTRjNjY4YWMiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1yZWFjdC1yZWFtbCIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwic2lkIjoiYmIzNDBjNjktNDU2ZC00M2FhLTgwYTYtZDFjMGE0YzY2OGFjIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiWWl4dWFuIExpIiwicHJlZmVycmVkX3VzZXJuYW1lIjoieWl4dWFuIiwiZ2l2ZW5fbmFtZSI6IllpeHVhbiIsImZhbWlseV9uYW1lIjoiTGkiLCJlbWFpbCI6ImxpQGdtYWlsLmNvbSJ9.l9aN4CHA3ZET_8-FefBJi2WKWnXk5a1bkiQTAptUIT3a_MQzx84CqoUUrBBRfrM5prFS7AVGrXtljEqCBcTtLbBV-VPb_lHI8AHn2FfrT1OlsxXNm0_CCACKUERoeptk-9BMLi43PH1kjOK0UDEXNOgC80tIlBYCAmi1xj8maKhN86vD-2S0StFt5ZstM9p1D30kZ_z3hNe4QZQfMVwXPiTrC9ytH2nzK1g4ZKYlBNTAD8raz79wAvvx_tvd5hAnxwmcp1XZZzrtNyIahkKUEqc9Hht4IW9Apm7ToIGi304yeAIKu8uCeEJ2R1SFtzHwLwfCBAU5xVPGf-ep2hLWmA";
  const headers = {
    Authorization: token ? `Bearer ${token}` : undefined,
  };
  const response = await axios.get(`${API_URL}/${id}`, { headers });
  return response.data;
};

// 创建新产品
export const createProduct = async (product: Product): Promise<Product> => {
  const token = getAccessToken();
  const headers = {
    Authorization: token ? `Bearer ${token}` : undefined,
  };
  const response = await axios.post(API_URL, product, { headers });
  return response.data;
};

// 更新现有产品
export const updateProduct = async (id: string, product: Product): Promise<Product> => {
  const token = getAccessToken();
  const headers = {
    Authorization: token ? `Bearer ${token}` : undefined,
  };
  const response = await axios.put(`${API_URL}/${id}`, product, { headers });
  return response.data;
};

// 删除产品
export const deleteProduct = async (id: string): Promise<void> => {
  const token = getAccessToken();
  const headers = {
    Authorization: token ? `Bearer ${token}` : undefined,
  };
  await axios.delete(`${API_URL}/${id}`, { headers });
};
