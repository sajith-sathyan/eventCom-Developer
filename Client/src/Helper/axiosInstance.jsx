import axios from "axios";
import { refreshToken } from "./Helper";

const baseURL = process.env.REACT_APP_BASE_URL;

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: baseURL,
});
// Add a request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");
    console.log("accessToken-------------->",accessToken);
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log(error);
    // if (error.response.status === 403) {
    //   const refreshTokenn = localStorage.getItem("refreshToken");
    //   try {
    //     const newAccessToken = await refreshToken(refreshTokenn);
    //     // Update the access token in local storage or cookie
    //     localStorage.setItem("accessToken", newAccessToken);
    //     // Retry the original request with the new access token
    //     const originalRequest = error.config;
    //     originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
    //     return axiosInstance.request(originalRequest);
    //   } catch (refreshError) {
    //     // Handle refresh token error
    //     console.error(refreshError);
    //     // Redirect to the login page or display an error message
    //   }
    // }
    return Promise.reject(error);
  }
);

export default axiosInstance;
