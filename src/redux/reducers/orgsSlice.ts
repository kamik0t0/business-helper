import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import { OrgsState } from "../../models/organization";
import {
    getOrgsByUserId,
    postOrganization,
    deleteOrganization,
} from "../actions/OrgsAction";
import { errorHanlder } from "../scripts/errorHandler";
import { orgFilter } from "../scripts/orgFilter";

const initialState: OrgsState = {
    orgs: [],
    org: null,
    loading: false,
    error: null,
};

const orgsSlice = createSlice({
    name: "orgs",
    initialState,
    reducers: {
        setUserOrg(state, action: PayloadAction<string | number | null>) {
            orgFilter(state, action);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getOrgsByUserId.fulfilled, (state, action) => {
            state.orgs = action.payload;
        });
        builder.addCase(getOrgsByUserId.rejected, (state, action) => {
            errorHanlder(state, action);
        });
        builder.addCase(postOrganization.rejected, (state, action) => {
            errorHanlder(state, action);
        });
        builder.addCase(deleteOrganization.rejected, (state, action) => {
            errorHanlder(state, action);
        });
    },
});
export const { setUserOrg } = orgsSlice.actions;
export default orgsSlice.reducer;
