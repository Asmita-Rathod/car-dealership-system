import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

api.interceptors.request.use(
  (config) => {
    // Don't attach JWT to authentication endpoints
    if (
      config.url?.includes("auth/login") ||
      config.url?.includes("auth/register") ||
      config.url?.includes("token/refresh")
    ) {
      return config;
    }

    const token = localStorage.getItem("access");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;