import axios from "axios";

const backend = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_BACKEND
      : process.env.REACT_APP_BACKEND_DEV,
});
backend.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("token");
    if (token) config.headers = { Authorization: `Bearer ${token}` };
    return config;
  },
  (error) => Promise.reject(error)
);

export default backend;
