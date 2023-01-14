import axios from "axios";

const API_URL = process.env.REACT_APP_BASE_API_URL;

axios.defaults.withCredentials = true;

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

const updateEmployerData = async (values) => {
  try {
    let response = await axios.put(API_URL + `/Company/Update`, values, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
    if (response.status === 201) {
      return response;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

const createOffer = async (values) => {
  try {
    let response = await axios.put(API_URL + `/Offers/CreateOffer`, values);
    console.log(response);
    if (response.status === 201 || response.status === 200) {
      return response;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

const EmployerService = {
  getEmployerOffers,
  updateEmployerData,
  createOffer,
};

export default EmployerService;
