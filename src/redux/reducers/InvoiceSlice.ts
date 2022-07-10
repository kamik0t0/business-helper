import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import { IInvoice, IInvoiceState } from "../../models/invoice";
import { getSalesByOrgId } from "../actions/SalesAction";
import { getPurchasesByOrgId } from "../actions/PurchasesAction";
import { errorHanlder } from "../scripts/errorHandler";

const initialState: IInvoiceState = {
    purchases: [],
    sales: [],
    Invoice: null,
    InvoiceItems: [],
    loading: false,
    error: null,
};

const InvoicesSlice = createSlice({
    name: "Invoices",
    initialState,
    reducers: {
        setInvoice(state, action: PayloadAction<IInvoice>) {
            state.Invoice = action.payload;
        },
        setSales(state, action: PayloadAction<IInvoice[]>) {
            state.sales = action.payload;
        },
        setPurchases(state, action: PayloadAction<IInvoice[]>) {
            state.purchases = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getSalesByOrgId.fulfilled, (state, action) => {
            state.sales = action.payload;
        });
        builder.addCase(getPurchasesByOrgId.fulfilled, (state, action) => {
            state.purchases = action.payload;
        });
        builder.addCase(getSalesByOrgId.rejected, (state, action) => {
            errorHanlder(state, action);
        });
        builder.addCase(getPurchasesByOrgId.rejected, (state, action) => {
            errorHanlder(state, action);
        });
    },
});

export const { setInvoice, setSales, setPurchases } = InvoicesSlice.actions;
export default InvoicesSlice.reducer;
