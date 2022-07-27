import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrgsState } from "../../interfaces/organization";
import {
    deleteOrganization,
    getOrgsByUserId,
    postOrganization,
} from "../actions/OrgsAction";
import { errorHanlder } from "../scripts/errorHandler";
import { orgFilter } from "../scripts/orgFilter";

const initialState: OrgsState = {
    orgs: [],
    org: null,
    isLoading: false,
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
            state.isLoading = false;
        });
        builder.addCase(getOrgsByUserId.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getOrgsByUserId.rejected, (state, action) => {
            errorHanlder(state, action);
            state.isLoading = false;
        });
        builder.addCase(postOrganization.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(postOrganization.rejected, (state, action) => {
            errorHanlder(state, action);
            state.isLoading = false;
        });
        builder.addCase(postOrganization.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(deleteOrganization.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(deleteOrganization.rejected, (state, action) => {
            errorHanlder(state, action);
            state.isLoading = false;
        });
        builder.addCase(deleteOrganization.pending, (state, action) => {
            state.isLoading = true;
        });
    },
});
export const { setUserOrg } = orgsSlice.actions;
export default orgsSlice.reducer;
