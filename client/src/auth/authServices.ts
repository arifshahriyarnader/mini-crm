import axios from "axios";
import { appConfig } from "../common/config";
import { AuthUser, LoginData, SignupData } from "./authTypes";

const saveAuthUser = (authUser: AuthUser) => {
  localStorage.setItem(appConfig.CURRENT_USER_KEY, JSON.stringify(authUser));
};

const getAuthUser = (): AuthUser | null => {
  const storedUser = localStorage.getItem(appConfig.CURRENT_USER_KEY);
  if (!storedUser) return null;
  return JSON.parse(storedUser);
};

export const isUserLoggedIn = () => {
  return !!getAuthUser();
};

export const getAccessToken = () => {
  const authUser = getAuthUser();
  return authUser?.accessToken || null;
};

export const getRefreshToken = () => {
  const authUser = getAuthUser();
  return authUser?.refreshToken || null;
};

export const signup = (userData: SignupData) => {
  return axios.post(`${appConfig.BASE_URL}/api/user/register`, userData);
};

export const login = async (loggedUserData: LoginData) => {
  try {
    const response = await axios.post(
      `${appConfig.BASE_URL}/api/user/login`,
      loggedUserData
    );
    const authUser: AuthUser = {
      user: {
        _id: response.data._id,
        name: response.data.name,
        email: response.data.email,
        role: response.data.role,
      },
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
    };

    saveAuthUser(authUser);
    return authUser;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Login failed:", error.response?.data || error.message);
    } else {
      console.error("An unexpected error occurred:", error);
    }
    throw error;
  }
};


export const logout = () => {
  localStorage.removeItem(appConfig.CURRENT_USER_KEY);
};