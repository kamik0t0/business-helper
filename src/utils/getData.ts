import { instance } from "./axiosInstance";

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
 * @returns {Promise<array>} requested data array
 */

export const getData = async function (
    url: string,
    params: IParams
): Promise<any> {
    try {
        const Data = await instance.get(url, { params });
        return Data.data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("Get Data error");
        }
    }
};
