import axios from "axios";

const API_URL = "https://localhost:7064";

axios.defaults.withCredentials = true;

function updateLocalstorage(response) {
  const actualUserLocally = JSON.parse(localStorage.getItem("user"));

  if (
    response?.data?.isLoggedInUserAccount &&
    actualUserLocally !== response?.data
  ) {
    const saveData = {
      ...response.data,
      keepLogged: actualUserLocally?.keepLogged,
    };
    localStorage.setItem("user", JSON.stringify(saveData));
  }
}

function saveToLocalstorage(response, values) {
  const saveData = { ...response.data, keepLogged: values.saveLogin };
  localStorage.setItem("user", JSON.stringify(saveData));
}

function removeFromLocalstorage() {
  const actualUserLocally = localStorage.getItem("user");

  if (actualUserLocally && !actualUserLocally?.keepLogged) {
    localStorage.removeItem("user");
  }
}

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
    let response = await axios.post(API_URL + "/Authentication/Login", values);

    if (response.status === 200 || 201) {
      if (response.data.includes("/Company/")) {
        axios.get(API_URL + response.data).then((response) => {
          saveToLocalstorage(response, values);
        });
      } else {
        axios.get(API_URL + "/Account/Profile").then((response) => {
          saveToLocalstorage(response, values);
        });
      }
    }
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const logout = async () => {
  removeFromLocalstorage();

  const response = axios.post(API_URL + "/Authentication/Logout");
  return response.data;
};

const getUserData = async (publicUrl, flag) => {
  try {
    let response;
    if (flag === "user") {
      response = await axios.get(API_URL + `/Account/User/${publicUrl}`);
    } else {
      response = await axios.get(API_URL + `/Company/${publicUrl}`);
    }

    updateLocalstorage(response);

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getLocalUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getUserData,
  getLocalUser,
};

export default AuthService;
