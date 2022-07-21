import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInvoice, IInvoiceState } from "../../interfaces/invoice";
import {
    getSalesByOrgId,
    getSaleItemsBySaleId,
    updateSaleBySaleId,
    deleteSaleBySaleId,
} from "../actions/SalesAction";
import {
    getPurchasesByOrgId,
    getPurchaseItemsBySaleId,
    updatePurchaseByPurchaseId,
    deletePurchaseByPurchaseId,
} from "../actions/PurchasesAction";
import { errorHanlder } from "../scripts/errorHandler";

const initialState: IInvoiceState = {
    purchases: [],
    sales: [],
    Invoice: null,
    InvoiceItem: null,
    InvoicePositionIndex: null,
    isLoading: false,
    error: null,
};

const InvoicesSlice = createSlice({
    name: "Invoices",
    initialState,
    reducers: {
        setInvoice(state, action: PayloadAction<IInvoice>) {
            if (action.payload == null) {
                state.Invoice = null;
                return;
            }
            state.Invoice = action.payload;
        },
        // setSaleItems(state, action: PayloadAction<ISaleItems[]>) {
        //     state.InvoiceItems = action.payload;
        // },
        setSales(state, action: PayloadAction<IInvoice[]>) {
            state.sales = action.payload;
        },
        // setPurchaseItems(state, action: PayloadAction<IPurchaseItems[]>) {
        //     state.InvoiceItems = action.payload;
        // },
        setPurchases(state, action: PayloadAction<IInvoice[]>) {
            state.purchases = action.payload;
        },
        setPosition(state, action: PayloadAction<number>) {
            state.InvoicePositionIndex = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getSalesByOrgId.fulfilled, (state, action) => {
            state.sales = action.payload;
            state.isLoading = false;
        });
        builder.addCase(getSalesByOrgId.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getSaleItemsBySaleId.fulfilled, (state, action) => {
            state.InvoiceItem = action.payload;
            state.isLoading = false;
        });
        builder.addCase(getPurchasesByOrgId.fulfilled, (state, action) => {
            state.purchases = action.payload;
            state.isLoading = false;
        });
        builder.addCase(getPurchasesByOrgId.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getPurchaseItemsBySaleId.fulfilled, (state, action) => {
            state.InvoiceItem = action.payload;
        });
        builder.addCase(getSaleItemsBySaleId.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(deleteSaleBySaleId.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(deleteSaleBySaleId.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(updateSaleBySaleId.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(
            deletePurchaseByPurchaseId.fulfilled,
            (state, action) => {
                state.isLoading = false;
            }
        );
        builder.addCase(deletePurchaseByPurchaseId.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(updatePurchaseByPurchaseId.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getSalesByOrgId.rejected, (state, action) => {
            errorHanlder(state, action);
        });
        builder.addCase(getPurchasesByOrgId.rejected, (state, action) => {
            errorHanlder(state, action);
        });
    },
});

export const {
    setInvoice,
    setSales,
    setPurchases,
    setPosition,
    // setSaleItems,
    // setPurchaseItems,
} = InvoicesSlice.actions;
export default InvoicesSlice.reducer;
