import { createAsyncThunk } from "@reduxjs/toolkit";
import { IOrg } from "../../interfaces/organization";
import { getData } from "../../utils/getData";
import { setAuth } from "../reducers/authSlice";
import { setUserOrg } from "../reducers/orgsSlice";
import { instance } from "../../utils/axiosInstance";

export const getOrgsByUserId = createAsyncThunk<
    IOrg[],
    number,
    { rejectValue: string }
>("orgs/getUserOrgs", async function (id, { rejectWithValue, dispatch }) {
    try {
        if (process.env.REACT_APP_URL_PRIVATE_OFFICE !== undefined) {
            const ORGS = await getData(
                process.env.REACT_APP_URL_PRIVATE_OFFICE,
                { UserId: id }
            );
            return ORGS;
        }
    } catch (error) {
        dispatch(setAuth(false));
        return rejectWithValue("Server Response Error");
    }
});

interface postInfo {
    created: boolean;
    insertId: number;
}

interface IThunkConfig {
    rejectValue: string;
    state: { userReducer: { data: { id: number } } };
}

export const postOrganization = createAsyncThunk<
    postInfo,
    object,
    IThunkConfig
>(
    "orgs/postOrganization",
    async function (organization, { rejectWithValue, dispatch, getState }) {
        try {
            if (process.env.REACT_APP_URL_PRIVATE_OFFICE !== undefined) {
                const response = await instance.post(
                    process.env.REACT_APP_URL_PRIVATE_OFFICE,
                    organization,
                    {
                        params: {
                            table: "Orgs",
                            foreignKey: "UserId",
                        },
                        withCredentials: true,
                    }
                );
                const responseInfo = await response.data;

                if (responseInfo.created && responseInfo.insertId) {
                    const { id: UserId } = getState().userReducer.data;
                    await dispatch(getOrgsByUserId(UserId));
                    dispatch(setUserOrg(responseInfo.insertId));
                }
                return responseInfo.insertId;
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

export const deleteOrganization = createAsyncThunk<
    deleteInfo,
    number,
    IThunkConfig
>(
    "orgs/deleteOrganization",
    async function (OrgId, { rejectWithValue, dispatch, getState }) {
        try {
            if (process.env.REACT_APP_URL_PRIVATE_OFFICE !== undefined) {
                const response = await instance.delete(
                    process.env.REACT_APP_URL_PRIVATE_OFFICE,
                    {
                        params: {
                            orgId: OrgId,
                            table: "Orgs",
                        },
                    }
                );
                const responseInfo = await response.data;

                if (responseInfo.deleted) {
                    const { id: UserId } = getState().userReducer.data;
                    await dispatch(getOrgsByUserId(UserId));
                    dispatch(setUserOrg(null));
                    return responseInfo;
                }
            }
        } catch (error) {
            dispatch(setAuth(false));
            return rejectWithValue("Server Response Error");
        }
    }
);

interface patchInfo {
    updated: boolean;
    message: string;
}

export const patchOrganization = createAsyncThunk<
    patchInfo,
    { id: number },
    IThunkConfig
>(
    "orgs/patchOrganization",
    async function (organization, { rejectWithValue, dispatch, getState }) {
        try {
            if (process.env.REACT_APP_URL_PRIVATE_OFFICE !== undefined) {
                console.log(organization);

                const response = await instance.patch(
                    process.env.REACT_APP_URL_PRIVATE_OFFICE,
                    organization,
                    {
                        params: {
                            table: "Orgs",
                        },
                    }
                );
                const responseInfo = await response.data;

                if (responseInfo.updated) {
                    const { id: UserId } = getState().userReducer.data;
                    await dispatch(getOrgsByUserId(UserId));
                    dispatch(setUserOrg(organization.id));
                }
                return responseInfo.insertId;
            }
        } catch (error) {
            dispatch(setAuth(false));
            return rejectWithValue("Server Response Error");
        }
    }
);
