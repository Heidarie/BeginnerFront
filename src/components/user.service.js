import axios from "axios";

const API_URL = "https://localhost:7064";

axios.defaults.withCredentials = true;

const getProfile = () => {
  return axios.get(API_URL + "/Account/Profile");
};

const getOfferDetails = async (publicUrl) => {
  try {
    const response = await axios.get(API_URL + `/Offers/${publicUrl}`);
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
  applyOffer,
};

export default UserService;
