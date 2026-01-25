import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

/* Attach token automatically */
api.interceptors.request.use((config) => {
  const user = localStorage.getItem("user");
  if (user) {
    const token = JSON.parse(user).token;
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
