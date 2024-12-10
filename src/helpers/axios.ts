import axios, { InternalAxiosRequestConfig } from "axios";

const BASE_URL = "https://testcase.myideasoft.com";
const accessToken = "AX5FTZ7UBAABUDT6XYYPW7LX";

const Axios = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
});

Axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    config.headers["Authorization"] = `Bearer ${accessToken}`;

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default Axios;
