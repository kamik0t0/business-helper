import { createAsyncThunk } from "@reduxjs/toolkit";
import { IInvoice } from "../../models/invoice";
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
