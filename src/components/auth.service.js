import axios from "axios";
import DataService from "./data.service";

const API_URL = process.env.REACT_APP_BASE_API_URL;

axios.defaults.withCredentials = true;
const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
};

const register = async (link, values) => {
  try {
    return await axios.post(API_URL + link, values);
  } catch (error) {
    console.log(error);
    return error;
  }
};

const login = async (values) => {
  try {
    let response = await axios.post(
      API_URL + "/Authentication/Login",
      values,
      config
    );
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
    let response = await axios.post(
      API_URL + `/Authentication/ConfirmAccount?token=${token}&mail=${mail}`
    );

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const logout = async () => {
  const response = await axios.post(API_URL + "/Authentication/Logout");
  DataService.deleteCookieAuthState("AuthState");
  return response;
};

const AuthService = {
  register,
  login,
  logout,
  confirmAccount,
};

export default AuthService;
