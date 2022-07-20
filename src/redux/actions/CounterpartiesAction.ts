import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICounterparty } from "../../models/counterparty";
import { getData } from "../../utils/getData";
import { setAuth } from "../reducers/authSlice";
import axios from "axios";

export const getCounterpatiesByOrgId = createAsyncThunk<
    ICounterparty[],
    number,
    { rejectValue: string }
>(
    "counterparties/getCounterparties",
    async function (id, { rejectWithValue, dispatch }) {
        try {
            if (process.env.REACT_APP_URL_COUNTERPARTY !== undefined) {
                const COUNTERPARTIES = await getData(
                    process.env.REACT_APP_URL_COUNTERPARTY,
                    { OrgId: id },
                    () => dispatch(setAuth(false))
                );
                return COUNTERPARTIES;
            }
        } catch (error) {
            return rejectWithValue("Server Response Error");
        }
    }
);

interface postInfo {
    created: boolean;
    message: string;
}

interface IThunkConfig {
    rejectValue: string;
    state: {
        orgsReducer: { org: { id: number } };
    };
}

export const postCounterparty = createAsyncThunk<
    postInfo,
    object,
    IThunkConfig
>(
    "counterparties/postCounterparty",
    async function (counterparty, { rejectWithValue, dispatch, getState }) {
        try {
            if (process.env.REACT_APP_URL_COUNTERPARTY !== undefined) {
                const response = await axios.post(
                    process.env.REACT_APP_URL_COUNTERPARTY,
                    counterparty,
                    {
                        params: {
                            foreignKey: "OrgsId",
                        },
                    }
                );
                const responseInfo = await response.data;

                if (responseInfo.created) {
                    const { id: OrgId } = getState().orgsReducer.org;
                    await dispatch(getCounterpatiesByOrgId(OrgId));
                }
                return responseInfo.insertId;
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

export const deleteCounterparty = createAsyncThunk<
    deleteInfo,
    number,
    IThunkConfig
>(
    "counterparties/deleteCounterparty",
    async function (counterpartyId, { rejectWithValue, dispatch, getState }) {
        try {
            if (process.env.REACT_APP_URL_COUNTERPARTY !== undefined) {
                const response = await axios.delete(
                    process.env.REACT_APP_URL_COUNTERPARTY,
                    {
                        params: {
                            counterpartyId: counterpartyId,
                        },
                    }
                );
                const responseInfo = await response.data;

                if (responseInfo.deleted) {
                    const { id: OrgId } = getState().orgsReducer.org;
                    await dispatch(getCounterpatiesByOrgId(OrgId));
                    return responseInfo;
                }
            }
        } catch (error) {
            return rejectWithValue("Server Response Error");
        }
    }
);

interface patchInfo {
    updated: boolean;
    message: string;
}

export const patchCounterparty = createAsyncThunk<
    patchInfo,
    { id: number },
    IThunkConfig
>(
    "counterparties/patchCounterparty",
    async function (counterparty, { rejectWithValue, dispatch, getState }) {
        try {
            if (process.env.REACT_APP_URL_COUNTERPARTY !== undefined) {
                const response = await axios.patch(
                    process.env.REACT_APP_URL_COUNTERPARTY,
                    counterparty,
                    {
                        params: {
                            table: "counterparties",
                        },
                    }
                );
                const responseInfo = await response.data;

                if (responseInfo.updated) {
                    const { id: OrgId } = getState().orgsReducer.org;
                    await dispatch(getCounterpatiesByOrgId(OrgId));
                }
                return responseInfo.insertId;
            }
        } catch (error) {
            return rejectWithValue("Server Response Error");
        }
    }
);
