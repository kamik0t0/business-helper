import { createSlice } from "@reduxjs/toolkit";
import { IUserInitial } from "../../models/user";
import * as UserAPI from "../actions/UserActions";
import { errorHanlder } from "../scripts/errorHandler";

const initialState: IUserInitial = {
    data: {
        id: 0,
        email: "",
        auth: false,
        message: "",
        token: "",
    },
    isLoading: false,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(UserAPI.getUser.fulfilled, (state, action) => {
            state.data.auth = action.payload.auth;
            state.data.email = action.payload.email;
            state.data.id = action.payload.id;
            state.data.message = action.payload.message;
            state.data.token = action.payload.token;
            state.isLoading = false;
        });
        builder.addCase(UserAPI.getUser.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(UserAPI.getUser.rejected, (state, action) => {
            errorHanlder(state, action);
        });
        builder.addCase(UserAPI.postUser.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(UserAPI.postUser.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(UserAPI.postUser.rejected, (state, action) => {
            errorHanlder(state, action);
        });
        builder.addCase(UserAPI.updateUser.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(UserAPI.updateUser.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(UserAPI.updateUser.rejected, (state, action) => {
            errorHanlder(state, action);
        });
    },
});

export default userSlice.reducer;
