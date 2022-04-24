export default async function authTokenInterseptor(axios, dispatchFalse) {
    axios.interceptors.request.use(
        function (config) {
            config.headers.Authorization = `Bearer ${localStorage.getItem(
                "token"
            )}`;
            return config;
        },
        function (error) {
            return Promise.reject(error);
        }
    );

    axios.interceptors.response.use(
        function (config) {
            return config;
        },
        function (error) {
            dispatchFalse();
            return Promise.reject(error);
        }
    );
}
