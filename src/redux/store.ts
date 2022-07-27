import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import counterpartyReducer from "./reducers/counterpartiesSlice";
import invoicesReducer from "./reducers/InvoiceSlice";
import orgsReducer from "./reducers/orgsSlice";
import userReducer from "./reducers/userSlice";

const store = configureStore({
    reducer: {
        authReducer: authReducer,
        orgsReducer: orgsReducer,
        userReducer: userReducer,
        counterpartyReducer: counterpartyReducer,
        invoicesReducer: invoicesReducer,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
