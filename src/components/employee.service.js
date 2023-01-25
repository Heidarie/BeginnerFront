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

const getProfile = () => {
  return instance.get("/Account/Profile");
};

const updateUserData = async (values) => {
  try {
    let response = await instance.put(`/Account/UpdateUser`, values, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    return error;
  }
};

const updateUserDetails = async (values, type) => {
  const orderValues = {
    milestones: values.map((obj, index) => ({
      ...obj,
      order: index + 1,
    })),
  };
  try {
    let response = await instance.put(
      `/Account/Update?type=${type}`,
      orderValues
    );
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    return error;
  }
};

const applyOffer = async (publicUrl) => {
  try {
    let response = await instance.post(`/Apply/${publicUrl}`);
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    return error;
  }
};

const UserService = {
  getProfile,
  updateUserDetails,
  applyOffer,
  updateUserData,
};

export default UserService;
