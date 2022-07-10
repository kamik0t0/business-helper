import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICounterparty } from "../../models/counterparty";
import { getData } from "../../utils/getData";
import { setAuth } from "../reducers/authSlice";

export const getCounterpatiesByOrgId = createAsyncThunk<
    ICounterparty[],
    number,
    { rejectValue: string }
>(
    "counterparties/getCounterparties",
    async function (id, { rejectWithValue, dispatch }) {
        try {
            if (process.env.REACT_APP_URL_COUNTERPARTY !== undefined) {
                const COUNTERPARTIES = await getData(
                    process.env.REACT_APP_URL_COUNTERPARTY,
                    { OrgId: id },
                    () => dispatch(setAuth(false))
                );
                return COUNTERPARTIES;
            }
        } catch (error) {
            return rejectWithValue("Server Response Error");
        }
    }
);
