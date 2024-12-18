import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/v1", // Adjust to match your backend URL
});

// Add request interceptor to automatically add token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.token = token;
    }
    return config;
});


export default api;
