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

const getEmployerOffers = async () => {
  try {
    let response = await instance.get(`/Employer/Offers`);
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
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
    if (response.status === 201) {
      return response;
    }
  } catch (error) {
    return error;
  }
};

const createOffer = async (values) => {
  try {
    let response = await instance.put(`/Offers/CreateOffer`, values);
    if (response.status === 201 || response.status === 200) {
      return response;
    }
  } catch (error) {
    return error;
  }
};

const getApplicants = async (offerPublicUrl) => {
  try {
    let response = await instance.get(
      `/Employer/ApplicationManagement/${offerPublicUrl}`
    );
    if (response.status === 201 || response.status === 200) {
      return response;
    }
  } catch (error) {
    return error;
  }
};

const getUserResumee = async (publicUrl, applicationid) => {
  try {
    let response = await instance.get(
      `/Account/GetFile?userPublicUrl=${publicUrl}&applicationId=${applicationid}`,
      { responseType: "blob" }
    );
    if (response.status === 201 || response.status === 200) {
      return response;
    }
  } catch (error) {
    return error;
  }
};

const postApplicantResult = async (
  offerPublicUrl,
  employeePublicUrl,
  status
) => {
  try {
    let response = await instance.post(
      `/Employer/ApplicationManagement/${offerPublicUrl}?employeePublicUrl=${employeePublicUrl}&status=${status}`
    );
    if (response.status === 201 || response.status === 200) {
      return response;
    }
  } catch (error) {
    return error;
  }
};

const deleteOffer = async (offerPublicUrl, notifyApplicants) => {
  try {
    let response = await instance.delete(
      `/Offers/Delete/${offerPublicUrl}?notifyApplicants=${notifyApplicants}`
    );
    if (response.status === 201 || response.status === 200) {
      return response;
    }
  } catch (error) {
    return error;
  }
};

const EmployerService = {
  getEmployerOffers,
  getUserResumee,
  deleteOffer,
  updateEmployerData,
  createOffer,
  postApplicantResult,
  getApplicants,
};

export default EmployerService;
