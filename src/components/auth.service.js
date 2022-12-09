import axios from "axios";

const API_URL = "https://localhost:7064";

axios.defaults.withCredentials = true;

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
    const response = await axios.post(
      API_URL + "/Authentication/Login",
      values
    );
    console.log(response);
    if (response.status === 200) {
      axios.get(API_URL + "/Account/Profile").then((res) => {
        console.log(res);
        localStorage.setItem("user", JSON.stringify(res.data));
      });
    }
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const logout = () => {
  localStorage.removeItem("user");
  return axios.post(API_URL + "/Authentication/Logout").then((response) => {
    return response.data;
  });
};

const getUser = async (userPublicUrl) => {
  try {
    const response = await axios.get(
      API_URL + `/Account/User/${userPublicUrl}`
    );
    if (response.data.isLoggedInUserAccount) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    if (localStorage.getItem("user") !== response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  getUser,
};

export default AuthService;
