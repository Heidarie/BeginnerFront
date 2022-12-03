import axios from "axios";

const API_URL = "https://localhost:7064";

axios.defaults.withCredentials = true;

const getProfile = () => {
  return axios.get(API_URL + "/Account/Profile");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user");
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod");
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin");
};

const UserService = {
  getProfile,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};

export default UserService;
