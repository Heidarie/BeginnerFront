import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
  },
});

const getEmployerOffers = async () => {
  try {
    let response = await instance.get(`/Employer/Offers`);
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
    let response = await instance.put(`/Company/Update`, values, {
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
    let response = await instance.put(`/Offers/CreateOffer`, values);
    console.log(response);
    if (response.status === 201 || response.status === 200) {
      return response;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getApplicants = async (publicUrl) => {
  try {
    let response = await instance.get(
      `/Employer/ApplicationManagement/${publicUrl}`
    );
    console.log(response);
    if (response.status === 201 || response.status === 200) {
      return response;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getUserResumee = async (publicUrl, applicationid) => {
  try {
    let response = await instance.get(
      `/Account/GetFile?userPublicUrl=${publicUrl}&applicationId=${applicationid}`
    );
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
  getUserResumee,
  updateEmployerData,
  createOffer,
  getApplicants,
};

export default EmployerService;
