import {
    createSlice,
    PayloadAction,
    current,
    createSerializableStateInvariantMiddleware,
    isPlainObject,
} from "@reduxjs/toolkit";
import { IInvoice, IInvoiceState } from "../../interfaces/invoice";
import { InvoicePositionConstructor } from "../../utils/InvoiceItemClass";
import { IInvoicePosition } from "../../interfaces/invoice";
import {
    deletePurchaseByPurchaseId,
    getPurchaseItemsBySaleId,
    getPurchasesByOrgId,
    updatePurchaseByPurchaseId,
} from "../actions/PurchasesAction";
import {
    deleteSaleBySaleId,
    getSaleItemsBySaleId,
    getSalesByOrgId,
    updateSaleBySaleId,
} from "../actions/SalesAction";
import { errorHanlder } from "../scripts/errorHandler";

const initialState: IInvoiceState = {
    purchases: [],
    sales: [],
    Invoice: null,
    InvoicePosition: [],
    InvoicePositionIndex: null,
    isLoading: false,
    error: null,
};

const InvoicesSlice = createSlice({
    name: "Invoices",
    initialState,
    reducers: {
        setSales(state, action: PayloadAction<IInvoice[]>) {
            state.sales = action.payload;
        },
        setPurchases(state, action: PayloadAction<IInvoice[]>) {
            state.purchases = action.payload;
        },
        setInvoice(state, action: PayloadAction<IInvoice | null>) {
            if (action.payload == null) {
                state.Invoice = null;
                return;
            }
            state.Invoice = action.payload;
        },
        setInvoicePositions(state, action: PayloadAction<IInvoicePosition[]>) {
            state.InvoicePosition = action.payload;
        },
        addInvoicePosition(state, action: PayloadAction<IInvoicePosition>) {
            state.InvoicePosition?.push(action.payload);
        },
        deleteInvoicePosition(state, action: PayloadAction<number>) {
            const number = action.payload;
            state.InvoicePosition?.splice(number, 1);
        },
        setPositionNumber(state, action: PayloadAction<number>) {
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
            state.InvoicePosition = action.payload;
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
            state.InvoicePosition = action.payload;
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
    setPositionNumber,
    setInvoicePositions,
    addInvoicePosition,
    deleteInvoicePosition,
    // setSaleItems,
    // setPurchaseItems,
} = InvoicesSlice.actions;
export default InvoicesSlice.reducer;
