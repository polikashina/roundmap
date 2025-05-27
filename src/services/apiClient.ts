import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.example.com", // Replace with your actual API base URL
  headers: {
    "Content-Type": "application/json",
  },
  maxContentLength: 1024 * 1024 * 100,
  timeout: 30 * 1000,
});

export default apiClient;
