import { createAsyncThunk } from "@reduxjs/toolkit";
import { IInvoice } from "../../models/invoice";
import { getData } from "../../utils/getData";
import { setAuth } from "../reducers/authSlice";

export const getSalesByOrgId = createAsyncThunk<
    IInvoice[],
    number,
    { rejectValue: string }
>("sales/getSales", async function (id, { rejectWithValue, dispatch }) {
    try {
        if (process.env.REACT_APP_URL_SALES !== undefined) {
            const SALES = await getData(
                process.env.REACT_APP_URL_SALES,
                { OrgId: id },
                () => dispatch(setAuth(false))
            );

            return SALES;
        }
    } catch (error) {
        return rejectWithValue("Server Response Error");
    }
});
