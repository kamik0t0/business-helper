import authTokenInterceptor from "./axiosInterceptor.js";
import axios from "axios";

const instance = axios.create();

interface getDataFunc {
    (url: string, params: { a: string }, callDispatch: object): Promise<object>;
}

/**
 * @async
 * @function requests data from DataBase and check auth with preflight request
 * @name getData
 * @param {string} url server endpoint
 * @param {object} params url params
 * @param {func} callDispatch state change callback
 * @return {Promise<array>} requested data
 */

export let getData: getDataFunc;

getData = async function (
    url: string,
    params: { a: string | number },
    callDispatch: object
) {
    try {
        await authTokenInterceptor(instance, callDispatch);
        const Data = await instance.get(url, { params });
        return Data.data;
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        } else {
            console.log(error);
        }
    }
};
