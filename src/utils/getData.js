import authTokenInterceptor from "./axiosInterceptor.js";
import axios from "axios";

const instance = axios.create();

/**
 * @async
 * @function requests data from DataBase and checked auth with preflight request
 * @name getData
 * @param {string} url
 * @param {func} callDispatch
 * @param {object} params
 * @return {Promise<array>} requested data
 */

export async function getData(url, params, callDispatch) {
    try {
        await authTokenInterceptor(instance, callDispatch);
        const Data = await instance.get(url, { params });
        return Data.data;
    } catch (error) {
        console.log(error.message);
    }
}
