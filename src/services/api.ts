import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/",
  timeout: 20000,
});

api.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    const status = error?.response?.status;
    if (status === 401) {
      window.location.href = "/logout";
    }
    return Promise.reject(error);
  }
);

export default api;
