import { BACKEND_URI } from "@/constants";
import { useAuthStore } from "@/stores/useUserStore";
import axios from "axios";

const instance = axios.create({
  baseURL: BACKEND_URI,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  async (config) => {
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
export default instance;
