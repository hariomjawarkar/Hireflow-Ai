import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8081/api",
    timeout: 5000, // 5 seconds timeout to prevent hanging
});

// ✅ Automatically attach JWT
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        // 🛡️ Extra check: Ensure token is not only present but looks valid
        if (token && token !== "null" && token !== "undefined" && token.length > 10) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ✅ Automatically handle 401 Unauthorized (Token expired/Invalid)
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.warn("Unauthorized access - Redirecting to login");
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
