import axios from "axios";
import Cookies from "js-cookie";
import axiosErrorManager from "./axiosErrorManager";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/api",
  withCredentials: true, // Ensures cookies are sent
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("token");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // mark request to avoid infinite loops
      try {
        const response = await axios.post(
          "http://localhost:3001/api/users/refreshToken",
          {},
          {
            withCredentials: true,
          }
        );
        const newAccessToken = response.data.token;

        Cookies.set("token", newAccessToken, {
          secure: true,
          sameSite: "None",
        });
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        console.error("Error refreshing token:", err);
        toast.error("Session expired. Please log in again.");
        Cookies.remove("token");
        Cookies.remove("refreshToken");
        Cookies.remove("user");

        const navigate = useNavigate();
        navigate("/login");
        return Promise.reject(err);
      }
    }

    console.error("Request failed:", axiosErrorManager(error));
    return Promise.reject(error);
  }
);

export default axiosInstance;
