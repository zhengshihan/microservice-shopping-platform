// Callback.tsx
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import userManager from "../authConfig";

const Callback: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    userManager
      .signinRedirectCallback()
      .then((user) => {
        dispatch(setUser(user));
        window.location.href = "/"; // Redirect to the homepage after login
      })
      .catch((error) => {
        console.error("Error during sign-in callback:", error);
      });
  }, [dispatch]);

  return <div>Loading...</div>;
};

export default Callback;
