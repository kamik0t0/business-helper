import axios, { AxiosResponse } from "axios";

export const instance = axios.create({
    withCredentials: true,
});

instance.interceptors.request.use(
    (config) => {
        config.headers!.Authorization = `Bearer ${localStorage.getItem(
            "token"
        )}`;
        return config;
    },
    (error: ErrorEvent) => Promise.reject(error)
);

instance.interceptors.response.use(
    (config: AxiosResponse) => config,
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            error.config &&
            !error.config._isRetry
        ) {
            originalRequest._isRetry = true;
            try {
                const response = await instance.get(
                    "http://localhost:5600/login/refresh"
                );
                localStorage.setItem("token", response.data.access);
                return instance.request(originalRequest);
            } catch (error) {
                console.log(error);
            }
        }
        return Promise.reject(error);
    }
);
