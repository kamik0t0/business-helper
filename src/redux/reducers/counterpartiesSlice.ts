import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    CounterpartiesState,
    ICounterparty,
} from "../../interfaces/counterparty";
import * as CounterpartyAPI from "../actions/CounterpartiesAction";
import { errorHanlder } from "../scripts/errorHandler";

const initialState: CounterpartiesState = {
    counterparties: [],
    counterparty: null,
    isLoading: false,
    error: null,
};

const counterpartiesSlice = createSlice({
    name: "counterparties",
    initialState,
    reducers: {
        setCounterparty(state, action: PayloadAction<ICounterparty | null>) {
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
                state.isLoading = false;
            }
        );
        builder.addCase(
            CounterpartyAPI.getCounterpatiesByOrgId.pending,
            (state, action) => {
                state.isLoading = true;
            }
        );
        builder.addCase(
            CounterpartyAPI.getCounterpatiesByOrgId.rejected,
            (state, action) => {
                errorHanlder(state, action);
                state.isLoading = false;
            }
        );
        builder.addCase(
            CounterpartyAPI.postCounterparty.rejected,
            (state, action) => {
                errorHanlder(state, action);
                state.isLoading = false;
            }
        );
        builder.addCase(
            CounterpartyAPI.deleteCounterparty.rejected,
            (state, action) => {
                errorHanlder(state, action);
                state.isLoading = false;
            }
        );
        builder.addCase(
            CounterpartyAPI.patchCounterparty.rejected,
            (state, action) => {
                errorHanlder(state, action);
                state.isLoading = false;
            }
        );
    },
});
export const { setCounterparty, setCounterparties } =
    counterpartiesSlice.actions;
export default counterpartiesSlice.reducer;
