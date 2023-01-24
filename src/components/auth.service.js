import axios from "axios";
import DataService from "./data.service";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers": "*",
  },
});

const register = async (link, values) => {
  try {
    return await instance.post(link, values);
  } catch (error) {
    console.log(error);
    return error;
  }
};

const login = async (values) => {
  console.log(process.env.REACT_APP_BASE_API_URL);
  try {
    let response = await instance.post("/Authentication/Login", values);
    if (response.status === 200 || 201) {
      return response;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

const confirmAccount = async (token, mail) => {
  try {
    let response = await instance.post(
      `/Authentication/ConfirmAccount?token=${token}&mail=${mail}`
    );

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const logout = async () => {
  const response = await instance.post("/Authentication/Logout");
  return response;
};

const AuthService = {
  register,
  login,
  logout,
  confirmAccount,
};

export default AuthService;
