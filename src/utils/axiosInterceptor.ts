import { AxiosInstance } from "axios";

export default async function authTokenInterseptor(
    axios: AxiosInstance,
    dispatchFalse: () => void
) {
    axios.interceptors.request.use(
        (config) => {
            config.headers!.Authorization = `Bearer ${localStorage.getItem(
                "token"
            )}`;

            return config;
        },
        (error: ErrorEvent) => Promise.reject(error)
    );

    axios.interceptors.response.use(
        (config) => config,
        (error) => {
            dispatchFalse();
            return Promise.reject(error);
        }
    );
}
