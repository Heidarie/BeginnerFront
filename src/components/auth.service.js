import axios from "axios";

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
    return error;
  }
};

const login = async (values) => {
  try {
    let response = await instance.post("/Authentication/Login", values);
    if (response.status === 200 || 201) {
      return response;
    }
  } catch (error) {
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
    return error;
  }
};

const sendResetPasswordMail = async (email) => {
  try {
    let response = await instance.post(
      `/Authentication/SendResetPasswordMail?email=${email}`,
      {
        headers: {
          "Content-Type": "application/json-patch+json",
        },
      }
    );

    return response;
  } catch (error) {
    return error;
  }
};

const setNewPassword = async (token, mail, password) => {
  console.log(token, mail, password);
  try {
    let response = await instance.post(
      "/Authentication/SetNewPassword",
      {
        token: token,
        email: mail,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json-patch+json",
        },
      }
    );

    return response;
  } catch (error) {
    console.log("error");
    return error;
  }
};

const logout = async () => {
  const response = await instance.post("/Authentication/Logout");
  return response;
};

const AuthService = {
  sendResetPasswordMail,
  setNewPassword,
  register,
  login,
  logout,
  confirmAccount,
};

export default AuthService;
