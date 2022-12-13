import axios from "axios";

const API_URL = "https://localhost:7064";

axios.defaults.withCredentials = true;

const getProfile = () => {
  return axios.get(API_URL + "/Account/Profile");
};

const getOfferDetails = async (publicUrl) => {
  try {
    const response = await axios.get(API_URL + `/Offers/${publicUrl}`);
    console.log(response);
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

const updateUserData = async (values) => {
  try {
    const response = await axios.put(
      API_URL + `/Account/UpdateUserData`,
      values,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.log(error);
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
    const response = await axios.put(
      API_URL + `/Account/UpdateUserDetails?type=${type}`,
      orderValues
    );
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

const applyOffer = async (publicUrl) => {
  try {
    const response = await axios.post(API_URL + `/Apply/${publicUrl}`);
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

const UserService = {
  getProfile,
  getOfferDetails,
  updateUserDetails,
  applyOffer,
  updateUserData,
};

export default UserService;
