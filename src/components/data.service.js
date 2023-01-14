import axios from "axios";

const API_URL = process.env.REACT_APP_BASE_API_URL;

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

const getFilters = async (value) => {
  try {
    let response = await axios.get(API_URL + `/api/Filter?${value}`);
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
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

const getOffers = async (page, query) => {
  try {
    let response = await axios.get(API_URL + `/Offers/?page=${page}&${query}`);
    console.log(response);
    if (response.status === 200 || response.status === 201) {
      return response;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

const DataService = {
  getUserData,
  getOffers,
  getLocalUser,
  getFilters,
  getOfferDetails,
};

export default DataService;
