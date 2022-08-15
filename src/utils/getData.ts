import authTokenInterceptor from "./axiosInterceptor";
import axios from "axios";

const instance = axios.create();

interface IParams {
    UserId?: string | number;
    OrgId?: string | number;
    SaleId?: string | number;
    PurchaseId?: string | number;
    id?: string | number;
    table?: string;
}

/**
 * @async
 * @function requests data from DataBase and check auth with preflight request
 * @name getData
 * @param {string} url server endpoint
 * @param {object} params url params
 * @param {func} callDispatch state change callback
 * @return {Promise<array>} requested data array
 */

export const getData = async function (
    url: string,
    params: IParams,
    callDispatch: () => void
): Promise<any> {
    try {
        await authTokenInterceptor(instance, callDispatch);
        const Data = await instance.get(url, { params });
        return Data.data;
    } catch (error) {
        if (error instanceof Error) {
            console.log(error);

            throw new Error(error.message);
        } else {
            throw new Error("Get Data error");
        }
    }
};
