import axios from "axios";
import { appConfig } from "../common/config";

interface SignupData {
  name: string;
  email: string;
  password: string;
}

export const signup = (userData: SignupData) => {
  return axios.post(`${appConfig.BASE_URL}/api/user/register`, userData);
};
