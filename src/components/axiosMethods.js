import axios from "axios";

export async function axiosGET(link) {
  return axios
    .get(`https://localhost:7064${link}`)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
}
export async function axiosPOST(link, values) {
  return axios
    .post(`https://localhost:7064${link}`, values)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
}
