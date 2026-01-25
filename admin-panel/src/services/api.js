import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const admin = localStorage.getItem("admin");
  if (admin) {
    config.headers.Authorization = `Bearer ${
      JSON.parse(admin).token
    }`;
  }
  return config;
});

export default api;
