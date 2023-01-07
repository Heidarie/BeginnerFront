import axios from "axios";

const API_URL = "https://localhost:7064";

axios.defaults.withCredentials = true;

const updateCompanyData = async (values) => {
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

const UserService = {
  updateCompanyData,
};

export default UserService;
