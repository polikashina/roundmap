import axios from "axios";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: "https://api.example.com", // Replace with your actual API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
