import axios from "axios";

const API_URL = process.env.REACT_APP_BASE_API_URL;

axios.defaults.withCredentials = true;

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
const checkCookieAuthState = (name) => {
  let cookieName = name + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(cookieName) === 0) {
      return true;
    }
  }
  return false;
};
function deleteCookieAuthState(name) {
  if (checkCookieAuthState(name)) {
    document.cookie =
      name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }
}
const getUserData = async () => {
  try {
    let response = await axios.get(API_URL + "/api/About/Me");
    if (response.status === 200 || 201) {
      return response;
    }
    if (response.status === 403 || 401) {
      console.log("error", response);
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};
const getUserProfile = async (userPublicUrl) => {
  try {
    let response = await axios.get(API_URL + `/Account/User/${userPublicUrl}`);
    if (response.status === 200 || 201) {
      return response;
    }
    if (response.status === 403 || 401) {
      console.log("error", response);
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};
const getEmployerProfile = async (companyPublicUrl) => {
  try {
    let response = await axios.get(API_URL + `/Company/${companyPublicUrl}`);
    if (response.status === 200 || 201) {
      return response;
    }
    if (response.status === 403 || 401) {
      console.log("error", response);
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

const DataService = {
  getUserProfile,
  getEmployerProfile,
  getOffers,
  getFilters,
  getOfferDetails,
  checkCookieAuthState,
  getUserData,
  deleteCookieAuthState,
};

export default DataService;
