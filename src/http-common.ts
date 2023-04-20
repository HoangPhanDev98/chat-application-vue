import axios, { AxiosInstance } from "axios";

// const access_token = localStorage.getItem()

const apiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/",
  headers: {
    "Content-type": "application/x-www-form-urlencoded",
    Accept: "application/json",
  },
  withCredentials: true,
});

export default apiClient;
