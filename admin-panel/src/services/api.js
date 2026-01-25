import axios from "axios";

const api = axios.create({
  baseURL: "https://nishu-bhai-ecommerce.onrender.com/api",
});

/* Attach admin token */
api.interceptors.request.use((config) => {
  const admin = localStorage.getItem("admin");
  if (admin) {
    const token = JSON.parse(admin).token;
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
