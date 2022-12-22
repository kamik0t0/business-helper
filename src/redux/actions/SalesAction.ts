import { createAsyncThunk } from "@reduxjs/toolkit";
import { IInvoice, IInvoicePosition } from "../../interfaces/invoice";
import { instance } from "../../utils/axiosInstance";
import { getData } from "../../utils/getData";
import { setAuth } from "../reducers/authSlice";

export const getSalesByOrgId = createAsyncThunk<
    IInvoice[],
    number,
    { rejectValue: string }
>("sales/getSales", async function (id, { rejectWithValue, dispatch }) {
    try {
        if (process.env.REACT_APP_URL_SALES !== undefined) {
            const SALES = await getData(process.env.REACT_APP_URL_SALES, {
                OrgId: id,
            });

            return SALES;
        }
    } catch (error) {
        dispatch(setAuth(false));
        return rejectWithValue("Server Response Error");
    }
});

export const getSaleItemsBySaleId = createAsyncThunk<
    IInvoicePosition[],
    number,
    { rejectValue: string }
>("sales/getSaleItems", async function (invoiceId, ThunkAPI) {
    try {
        if (process.env.REACT_APP_URL_SALES !== undefined) {
            const SaleItems = await getData(
                process.env.REACT_APP_URL_SALES + "/" + invoiceId,
                { SaleId: invoiceId }
            );
            return SaleItems;
        }
    } catch (error) {
        ThunkAPI.dispatch(setAuth(false));
        return ThunkAPI.rejectWithValue("Server Response Error");
    }
});

export interface IThunkConfig {
    rejectValue: string;
    state: { orgsReducer: { org: { id: number } } };
}

export interface patchInfo {
    updated: boolean;
    message: string;
}

export const updateSaleBySaleId = createAsyncThunk<
    patchInfo,
    // добавить описание обязательны полей для обновляемой накладной
    { id: number },
    IThunkConfig
>(
    "sales/updateSaleBySaleId",
    async function (sale, { rejectWithValue, dispatch, getState }) {
        try {
            if (process.env.REACT_APP_URL_SALES !== undefined) {
                const response = await instance.patch(
                    process.env.REACT_APP_URL_SALES + "/" + sale.id,
                    sale,
                    {
                        params: {
                            table: "sales",
                            id: sale.id,
                        },
                    }
                );
                const responseInfo = await response.data;

                if (responseInfo.updated) {
                    const { id: OrgId } = getState().orgsReducer.org;

                    await dispatch(getSalesByOrgId(OrgId));
                }
                return responseInfo.updated;
            }
        } catch (error) {
            dispatch(setAuth(false));
            return rejectWithValue("Server Response Error");
        }
    }
);

export interface createInfo {
    created: boolean;
    message: string;
}

export const createSale = createAsyncThunk<createInfo, IInvoice, IThunkConfig>(
    "sales/createSale",
    async function (sale, { rejectWithValue, dispatch, getState }) {
        try {
            if (process.env.REACT_APP_URL_SALES !== undefined) {
                const response = await instance.post(
                    process.env.REACT_APP_URL_SALES,
                    sale,
                    {
                        params: {
                            table: "sales",
                            OrgId: sale.OrgId,
                            CounterpartyId: sale.counterpartyId,
                        },
                    }
                );
                const responseInfo = await response.data;

                if (responseInfo.created) {
                    const { id } = getState().orgsReducer.org;

                    await dispatch(getSalesByOrgId(id));
                }
                return responseInfo.created;
            }
        } catch (error) {
            dispatch(setAuth(false));
            return rejectWithValue("Server Response Error");
        }
    }
);

interface deleteInfo {
    deleted: boolean;
    message: string;
}

export const deleteSaleBySaleId = createAsyncThunk<
    deleteInfo,
    // добавить описание обязательны полей для обновляемой накладной
    { id: number },
    IThunkConfig
>(
    "sales/deleteSaleBySaleId",
    async function (id, { rejectWithValue, dispatch, getState }) {
        try {
            if (process.env.REACT_APP_URL_SALES !== undefined) {
                const response = await instance.delete(
                    process.env.REACT_APP_URL_SALES,
                    {
                        params: {
                            SaleId: id,
                        },
                    }
                );

                const responseInfo = await response.data;

                if (responseInfo.deleted) {
                    const { id: OrgId } = getState().orgsReducer.org;
                    await dispatch(getSalesByOrgId(OrgId));
                }

                return responseInfo.deleted;
            }
        } catch (error) {
            dispatch(setAuth(false));
            return rejectWithValue("Server Response Error");
        }
    }
);
