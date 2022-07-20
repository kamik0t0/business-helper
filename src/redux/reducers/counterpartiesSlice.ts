import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CounterpartiesState } from "../../models/counterparty";
import * as CounterpartyAPI from "../actions/CounterpartiesAction";
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
        builder.addCase(
            CounterpartyAPI.getCounterpatiesByOrgId.fulfilled,
            (state, action) => {
                state.counterparties = action.payload;
            }
        );
        builder.addCase(
            CounterpartyAPI.getCounterpatiesByOrgId.rejected,
            (state, action) => {
                errorHanlder(state, action);
            }
        );
        builder.addCase(
            CounterpartyAPI.postCounterparty.rejected,
            (state, action) => {
                errorHanlder(state, action);
            }
        );
        builder.addCase(
            CounterpartyAPI.deleteCounterparty.rejected,
            (state, action) => {
                errorHanlder(state, action);
            }
        );
        builder.addCase(
            CounterpartyAPI.patchCounterparty.rejected,
            (state, action) => {
                errorHanlder(state, action);
            }
        );
    },
});
export const { setCounterparty, setCounterparties } =
    counterpartiesSlice.actions;
export default counterpartiesSlice.reducer;
