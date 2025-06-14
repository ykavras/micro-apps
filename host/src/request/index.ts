import AXIOS, { type AxiosInstance } from "axios";
//
import useAuthStore from "StoreApp/stores/auth";

const axios: AxiosInstance = AXIOS.create({
  baseURL: "",
  timeout: 60000 * 200,
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.request.use(
  async (config) => {
    const { tokens } = useAuthStore.getState();
    if (tokens) {
      config.headers.Authorization = `Bearer ${tokens.accessToken}`;
    }

    return config;
  },
  (err) => Promise.reject(err)
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
