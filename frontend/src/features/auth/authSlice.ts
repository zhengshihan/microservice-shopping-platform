// redux/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'oidc-client-ts'; // 确保你正确导入 User 类型
import userManager from '../../authConfig';
import { AppThunk } from '../../app/store';

interface UserProfile {
  name?: string;
  email?: string; // 其他 profile 属性可选
  // 你可以根据需要添加其他属性
}

interface AuthState {
  user: {
    accessToken: string | null;
    idToken: string | null;
    refreshToken: string | null;
    profile: UserProfile | null; // 新增 profile 属性
  } | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<AuthState['user']> | null>) => {
      if (action.payload) {
        state.user = {
          accessToken: action.payload.accessToken || null,
          idToken: action.payload.idToken || null,
          refreshToken: action.payload.refreshToken || null,
          profile: action.payload.profile || null, // 这里设置 profile
        };
        state.isAuthenticated = true;
      } else {
        state.user = null;
        state.isAuthenticated = false;
      }
    },
    removeUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, removeUser } = authSlice.actions;

export const login = (): AppThunk => async () => {
  await userManager.signinRedirect();
};

export const logout = (): AppThunk => async (dispatch) => {
  await userManager.signoutRedirect();
  dispatch(removeUser());
};

export const fetchUser = (): AppThunk => async (dispatch) => {
  try {
    const user = await userManager.getUser();
    if (user) {
      dispatch(setUser({
        accessToken: user.access_token,
        idToken: user.id_token,
        refreshToken: user.refresh_token,
        profile: user.profile,
      }));
    } else {
      dispatch(setUser(null));
    }
  } catch (error) {
    console.error('Error fetching user:', error); // 记录任何错误
    dispatch(setUser(null)); // 在发生错误时，确保用户状态被设置为 null
  }
};


export default authSlice.reducer;
