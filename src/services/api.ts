import axios, {AxiosError, type AxiosInstance} from "axios";
import {storage} from "@/utils/StorageUtil.ts";
import {refreshToken} from "@/services/auth.ts";



const api:AxiosInstance = axios.create({
    baseURL: 'http://localhost:5001/api/v1',
    // baseURL: `https://tech-scribe-be.vercel.app/api/v1`
})

const PUBLIC_ENDPOINTS = ["auth/login", "auth/register"];

api.interceptors.request.use((config) => {
    const token = storage.getToken();

    const isPublic = PUBLIC_ENDPOINTS.some((endpoint) =>
        config.url?.includes(endpoint))

    if (!isPublic && token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})


api.interceptors.response.use(
    (response) => {
        return response
    },
    async (error: AxiosError) => {
        const originalRequest: any = error.config

        if (
            error.response?.status === 401 &&
            !PUBLIC_ENDPOINTS.some((url) => originalRequest.url?.includes(url)) &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true

            try {
                let storage = localStorage;
                let refreshTk = localStorage.getItem("refreshToken");

                if (!refreshTk) {
                    refreshTk = sessionStorage.getItem("refreshToken");
                    storage = sessionStorage;
                }

                if (!refreshTk) {
                    throw new Error("No refresh token available");
                }

                const data = await refreshToken(refreshTk);

                storage.setItem("accessToken", data.accessToken);

                originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                return axios(originalRequest);
            } catch (refreshErr) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                sessionStorage.removeItem("accessToken");
                sessionStorage.removeItem("refreshToken");
                window.location.href = "/login"
                console.error(refreshErr)
                return Promise.reject(refreshErr)
            }
        }
        return Promise.reject(error)
    }
)

export default api;