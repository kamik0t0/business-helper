import { createAsyncThunk } from "@reduxjs/toolkit";
import { IOrg } from "../../models/organization";
import { getData } from "../../utils/getData";
import { setAuth } from "../reducers/authSlice";
import { setUserOrg } from "../reducers/orgsSlice";
import axios from "axios";

export const getOrgsByUserId = createAsyncThunk<
    IOrg[],
    number,
    { rejectValue: string }
>("orgs/getUserOrgs", async function (id, { rejectWithValue, dispatch }) {
    try {
        if (process.env.REACT_APP_URL_PRIVATE_OFFICE !== undefined) {
            const ORGS = await getData(
                process.env.REACT_APP_URL_PRIVATE_OFFICE,
                { UserId: id },
                () => dispatch(setAuth(false))
            );

            return ORGS;
        }
    } catch (error) {
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
                const response = await axios.post(
                    process.env.REACT_APP_URL_PRIVATE_OFFICE,
                    organization,
                    {
                        params: {
                            table: "Orgs",
                            foreignKey: "UserId",
                        },
                    }
                );
                const ORG = await response.data;

                if (ORG.created && ORG.insertId) {
                    const { id: UserId } = getState().userReducer.data;
                    await dispatch(getOrgsByUserId(UserId));
                    dispatch(setUserOrg(ORG.insertId));
                }
                return ORG.insertId;
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

export const deleteOrganization = createAsyncThunk<
    deleteInfo,
    number,
    IThunkConfig
>(
    "orgs/deleteOrganization",
    async function (OrgId, { rejectWithValue, dispatch, getState }) {
        try {
            if (process.env.REACT_APP_URL_PRIVATE_OFFICE !== undefined) {
                const response = await axios.delete(
                    process.env.REACT_APP_URL_PRIVATE_OFFICE,
                    {
                        params: {
                            orgId: OrgId,
                            table: "Orgs",
                        },
                    }
                );
                const ORG = await response.data;

                if (ORG.deleted) {
                    const { id: UserId } = getState().userReducer.data;
                    await dispatch(getOrgsByUserId(UserId));
                    dispatch(setUserOrg(null));
                    return ORG;
                }
            }
        } catch (error) {
            return rejectWithValue("Server Response Error");
        }
    }
);
