import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    isAuth: boolean;
}

const initialState: AuthState = {
    isAuth: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // типизируем action синхронного reducer'а setAuth
        setAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload;
        },
    },
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
