// authConfig.ts
import { UserManager, WebStorageStateStore, UserManagerSettings } from 'oidc-client-ts';

const oidcConfig: UserManagerSettings = {
  authority: 'http://localhost:8181/realms/react-reaml', // Keycloak 的 OIDC 端点
  client_id: 'react-login-client', // 在 Keycloak 中注册的客户端 ID
  redirect_uri: window.location.origin +'/callback', // 登录后的重定向 URI
  response_type: 'code', // OIDC 响应类型
  scope: 'openid profile email', // OIDC 范围
  post_logout_redirect_uri: window.location.origin,
  automaticSilentRenew: true, // 自动刷新 token
  silent_redirect_uri: window.location.origin+"/silent-renew" , // 静默刷新 token 的 URI
  // userStore: new WebStorageStateStore({ store: window.localStorage }), // 使用 localStorage 存储用户会话
  userStore: new WebStorageStateStore({ store: window.sessionStorage }),
};

const userManager = new UserManager(oidcConfig);

export default userManager;
