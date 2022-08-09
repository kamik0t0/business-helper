import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IInvoice, IInvoicePosition } from "../../interfaces/invoice";
import { getData } from "../../utils/getData";
import { setAuth } from "../reducers/authSlice";

export const getPurchasesByOrgId = createAsyncThunk<
    IInvoice[],
    number,
    { rejectValue: string }
>("purchases/getPurchases", async function (id, { rejectWithValue, dispatch }) {
    try {
        if (process.env.REACT_APP_URL_PURCHASES !== undefined) {
            const PURCHASES = await getData(
                process.env.REACT_APP_URL_PURCHASES,
                { OrgId: id },
                () => dispatch(setAuth(false))
            );

            return PURCHASES;
        }
    } catch (error) {
        return rejectWithValue("Server Response Error");
    }
});

export const getPurchaseItemsBySaleId = createAsyncThunk<
    IInvoicePosition[],
    number,
    { rejectValue: string }
>(
    "purchases/getPurchaseItems",
    async function (invoiceId, { rejectWithValue, dispatch }) {
        try {
            if (process.env.REACT_APP_URL_PURCHASES !== undefined) {
                const PurchaseItems = await getData(
                    process.env.REACT_APP_URL_PURCHASES + "/" + invoiceId,
                    { PurchaseId: invoiceId },
                    () => dispatch(setAuth(false))
                );

                return PurchaseItems;
            }
        } catch (error) {
            return rejectWithValue("Server Response Error");
        }
    }
);

interface IThunkConfig {
    rejectValue: string;
    state: { orgsReducer: { org: { id: number } } };
}

interface patchInfo {
    updated: boolean;
    message: string;
}

export const updatePurchaseByPurchaseId = createAsyncThunk<
    patchInfo,
    // добавить описание обязательны полей для обновляемой накладной
    { id: number },
    IThunkConfig
>(
    "purchases/updatePurchaseByPurchaseId",
    async function (purchase, { rejectWithValue, dispatch, getState }) {
        try {
            if (process.env.REACT_APP_URL_PURCHASES !== undefined) {
                const response = await axios.patch(
                    process.env.REACT_APP_URL_PURCHASES + "/" + purchase.id,
                    purchase,
                    {
                        params: {
                            table: "purchases",
                            id: purchase.id,
                        },
                    }
                );

                const responseInfo = await response.data;

                if (responseInfo.updated) {
                    const { id: OrgId } = getState().orgsReducer.org;
                    await dispatch(getPurchasesByOrgId(OrgId));
                }

                return responseInfo.updated;
            }
        } catch (error) {
            return rejectWithValue("Server Response Error");
        }
    }
);

interface createInfo {
    created: boolean;
    message: string;
}

export const createPurchase = createAsyncThunk<
    createInfo,
    // добавить описание обязательны полей для обновляемой накладной
    { org: { id: number }; counterparty: { id: number } },
    IThunkConfig
>(
    "purchases/createPurchase",
    async function (purchase, { rejectWithValue, dispatch, getState }) {
        try {
            if (process.env.REACT_APP_URL_PURCHASES !== undefined) {
                const response = await axios.post(
                    process.env.REACT_APP_URL_PURCHASES,
                    purchase,
                    {
                        params: {
                            table: "purchases",
                            OrgId: purchase.org.id,
                            CounterpartyId: purchase.counterparty.id,
                        },
                    }
                );

                const responseInfo = await response.data;

                if (responseInfo.created) {
                    const { id: OrgId } = getState().orgsReducer.org;

                    await dispatch(getPurchasesByOrgId(OrgId));
                }

                return responseInfo.created;
            }
        } catch (error) {
            return rejectWithValue("Server Response Error");
        }
    }
);

interface deleteInfo {
    deleted: boolean;
    message: string;
}

export const deletePurchaseByPurchaseId = createAsyncThunk<
    deleteInfo,
    // добавить описание обязательны полей для обновляемой накладной
    { id: number },
    IThunkConfig
>(
    "purchases/deletePurchaseByPurchaseId",
    async function (id, { rejectWithValue, dispatch, getState }) {
        try {
            if (process.env.REACT_APP_URL_PURCHASES !== undefined) {
                const response = await axios.delete(
                    process.env.REACT_APP_URL_PURCHASES,
                    {
                        params: {
                            PurchaseId: id,
                        },
                    }
                );

                const responseInfo = await response.data;

                if (responseInfo.deleted) {
                    const { id: OrgId } = getState().orgsReducer.org;
                    await dispatch(getPurchasesByOrgId(OrgId));
                }

                return responseInfo.deleted;
            }
        } catch (error) {
            return rejectWithValue("Server Response Error");
        }
    }
);
