import axios from "axios";

const API_URL = process.env.REACT_APP_BASE_API_URL;

axios.defaults.withCredentials = true;

const getProfile = () => {
  return axios.get(API_URL + "/Account/Profile");
};

const getOfferDetails = async (publicUrl) => {
  try {
    let response = await axios.get(API_URL + `/Offers/${publicUrl}`);
    console.log(response);
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};
const getEmployerOffers = async () => {
  try {
    let response = await axios.get(API_URL + `/Employer/Offers`);
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
    let response = await axios.put(
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
    let response = await axios.put(
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
    let response = await axios.post(API_URL + `/Apply/${publicUrl}`);
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

const EmployerService = {
  getProfile,
  getEmployerOffers,
  updateUserDetails,
  applyOffer,
  updateUserData,
};

export default EmployerService;
