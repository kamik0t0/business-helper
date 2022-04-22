import authTokenInterceptor from "./axiosInterceptor.js";
import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:5600",
});

export async function getData(url, callDispatch) {
    try {
        await authTokenInterceptor(callDispatch, instance);
        const Data = await instance.get(url);
        return Data.data;
    } catch (error) {
        console.log(error.message);
    }
}
