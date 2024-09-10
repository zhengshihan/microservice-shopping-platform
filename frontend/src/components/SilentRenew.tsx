// src/components/SilentRenew.tsx
import React, { useEffect } from "react";
import userManager from "../authConfig";

const SilentRenew: React.FC = () => {
  useEffect(() => {
    const silentRenew = async () => {
      try {
        const user = await userManager.signinSilent();
        console.log("Token refreshed successfully", user);
      } catch (error) {
        console.error("Silent token refresh error", error);
        // 如果刷新失败，您可能需要处理注销或重定向到登录
      }
    };

    silentRenew();
  }, []);

  return <div>Silent Renew in progress...</div>;
};

export default SilentRenew;
