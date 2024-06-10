import axios from "axios";
import { toast } from "react-hot-toast";

const axiosInstance = axios.create({
    baseURL:"http://localhost:3000"
})

axiosInstance.interceptors.request.use((config) => {
    return config;
})

axiosInstance.interceptors.response.use((response) => response, (error) => {
    const status = error.response?.status;
    const data = error.response?.data;
    if (status === 400) {
      toast.error(data?.error || "Bad Request. Please check your input.");
    } else if (status === 503) {
      toast.error(data?.error || "Service Unavailable. Please try again later.");
    } else {
      toast.error(data?.error || "An unexpected error occurred. Please try again.");
    }
    return Promise.reject(error);
})

export default axiosInstance