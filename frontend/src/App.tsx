// src/App.tsx
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, login, logout } from "./features/auth/authSlice";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
// import ProductDetail from "./components/ProductDetail";
import { RootState, AppDispatch } from "./app/store";
import Callback from "./components/Callback";
import SilentRenew from "./components/SilentRenew";
import ProductDetail from "./components/ProductDetail";

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleLogin = () => {
    dispatch(login());
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="App">
      <header className="bg-gray-800 text-white p-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Product Management</h1>
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <p className="text-lg">
                Welcome,{" "}
                {user?.idToken ? user?.profile?.name || "User" : "Guest"}
              </p>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
            >
              Login
            </button>
          )}
        </div>
      </header>

      <Router>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/past" element={<ProductList />} />
          <Route path="/upcoming" element={<ProductList />} />
          <Route path="/create" element={<ProductForm />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="/silent-renew" element={<SilentRenew />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
