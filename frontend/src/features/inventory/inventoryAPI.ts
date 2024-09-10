// src/features/products/productAPI.ts
import axios from 'axios';
import { Inventory } from './inventoryTypes';
import { RootState } from '../../app/store'; // 导入 RootState
import { store } from '../../app/store'; // 导入 store
import { useDispatch, useSelector } from "react-redux";

const API_URL = 'http://localhost:8060/api/inventory';

// 获取 access token 的函数
const getAccessTokenFromStorage = (): string | null => {
//   const user = localStorage.getItem('oidc.user:http://localhost:8181/realms/react-reaml:react-login-client'); // 根据实际存储的 key 

const user = sessionStorage.getItem('oidc.user:http://localhost:8181/realms/react-reaml:react-login-client');
  if (user) {
    const parsedUser = JSON.parse(user);
    return parsedUser.access_token || null; // 获取 access_token
  }
  return null; // 如果没有找到 token，返回 null
  
};




// 发送 GET 请求获取产品
export const fetchInventories = async (): Promise<Inventory[]> => {

  const token = getAccessTokenFromStorage();

  
  // 设置请求头
  const headers = {
    Authorization: token ? `Bearer ${token}` : undefined,
  };

try {

     
      const response = await axios.get(`${API_URL}/all`,{headers});
      return response.data;
    }

catch (error) {
    console.error("Error fetching products:", error);
    // 根据需要处理错误
    throw error; // 或者返回一个默认值
  }




};




