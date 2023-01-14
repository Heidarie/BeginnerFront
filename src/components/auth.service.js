import axios from "axios";

const API_URL = process.env.REACT_APP_BASE_API_URL;

axios.defaults.withCredentials = true;

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

const confirmAccount = async (token, mail) => {
  try {
    let response = await axios.post(
      API_URL + `/ConfirmAccount?token=${token}&mail=${mail}`
    );

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

const AuthService = {
  register,
  login,
  logout,
  confirmAccount,
};

export default AuthService;
