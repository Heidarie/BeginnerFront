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

const getFilters = async (value) => {
  try {
    let response = await instance.get(`/api/Filter?${value}`);
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    return error;
  }
};

const getOfferDetails = async (publicUrl) => {
  try {
    let response = await instance.get(`/Offers/${publicUrl}`);
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    return error;
  }
};

const getOffers = async (page, query) => {
  try {
    let response = await instance.get(`/Offers/?page=${page}&${query}`);
    if (response.status === 200 || response.status === 201) {
      return response;
    }
  } catch (error) {
    return error;
  }
};
const checkCookieAuthState = (name) => {
  const cookieName = document.cookie.split("; ").reduce((r, v) => {
    const parts = v.split("=");
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, "");
  if (cookieName === "unlogged" || cookieName === undefined) {
    return false;
  } else {
    return true;
  }
};

function deleteCookieAuthState(name) {
  if (checkCookieAuthState(name)) {
    document.cookie =
      name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }
}
const getUserData = async () => {
  try {
    let response = await instance.get("/api/About/Me");
    if (response.status === 200 || 201) {
      return response;
    }
    if (response.status === 403 || 401) {
      return response;
    }
  } catch (error) {
    return error;
  }
};
const getUserProfile = async (userPublicUrl) => {
  try {
    let response = await instance.get(`/Account/User/${userPublicUrl}`);
    if (response.status === 200 || 201) {
      return response;
    }
    if (response.status === 403 || 401) {
      return response;
    }
  } catch (error) {
    return error;
  }
};
const getEmployerProfile = async (companyPublicUrl) => {
  try {
    let response = await instance.get(`/Company/${companyPublicUrl}`);
    if (response.status === 200 || 201) {
      return response;
    }
    if (response.status === 403 || 401) {
      return response;
    }
  } catch (error) {
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
