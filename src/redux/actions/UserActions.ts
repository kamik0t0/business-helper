import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces/user";
import { instance } from "../../utils/axiosInstance";
import { setAuth } from "../reducers/authSlice";

export const getUser = createAsyncThunk<IUser, object, { rejectValue: string }>(
    "user/getUser",
    async function (user, { rejectWithValue, dispatch }) {
        try {
            if (process.env.REACT_APP_URL_AUTH !== undefined) {
                const response = await instance.post(
                    process.env.REACT_APP_URL_AUTH,
                    user
                );
                const User = await response.data;
                dispatch(setAuth(User.auth));
                return User;
            }
        } catch (error) {
            return rejectWithValue("User Error: Wrong password or email");
        }
    }
);

export const postUser = createAsyncThunk<
    IUser,
    object,
    { rejectValue: string }
>("user/postUser", async function (user, { rejectWithValue }) {
    try {
        if (process.env.REACT_APP_URL_REG !== undefined) {
            const response = await instance.post(
                process.env.REACT_APP_URL_REG,
                user
            );
            const User = await response.data;
            return User;
        }
    } catch (error) {
        return rejectWithValue("User Error: Server registration error");
    }
});

export const updateUser = createAsyncThunk<
    { updated: string } | string | undefined,
    object,
    { rejectValue: string }
>("user/updateUser", async function (user, { rejectWithValue }) {
    try {
        if (process.env.REACT_APP_URL_RECOVER !== undefined) {
            const response = await instance.post(
                process.env.REACT_APP_URL_RECOVER,
                user
            );
            const User = await response.data;
            return User;
        }
    } catch (error) {
        return rejectWithValue("User Error: Server user update error");
    }
});
