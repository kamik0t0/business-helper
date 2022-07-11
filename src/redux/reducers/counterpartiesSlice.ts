import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import { CounterpartiesState } from "../../models/counterparty";
import {
    getCounterpatiesByOrgId,
    postCounterparty,
    deleteCounterparty,
    patchCounterparty,
} from "../actions/CounterpartiesAction";
import { ICounterparty } from "../../models/counterparty";
import { errorHanlder } from "../scripts/errorHandler";

const initialState: CounterpartiesState = {
    counterparties: [],
    counterparty: null,
    loading: false,
    error: null,
};

const counterpartiesSlice = createSlice({
    name: "counterparties",
    initialState,
    reducers: {
        setCounterparty(state, action: PayloadAction<ICounterparty>) {
            state.counterparty = action.payload;
        },
        setCounterparties(state, action: PayloadAction<ICounterparty[]>) {
            state.counterparties = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCounterpatiesByOrgId.fulfilled, (state, action) => {
            state.counterparties = action.payload;
        });
        builder.addCase(getCounterpatiesByOrgId.rejected, (state, action) => {
            errorHanlder(state, action);
        });
        builder.addCase(postCounterparty.rejected, (state, action) => {
            errorHanlder(state, action);
        });
        builder.addCase(deleteCounterparty.rejected, (state, action) => {
            errorHanlder(state, action);
        });
        builder.addCase(patchCounterparty.rejected, (state, action) => {
            errorHanlder(state, action);
        });
    },
});
export const { setCounterparty, setCounterparties } =
    counterpartiesSlice.actions;
export default counterpartiesSlice.reducer;
