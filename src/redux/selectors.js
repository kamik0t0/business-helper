import { createSelector } from "reselect";

const Sales = (state) => state.setSales.sales;
const Purchases = (state) => state.setPurchases.purchases;

export const selectSales = createSelector(Sales, (waybills) =>
    waybills.filter((waybill) => waybill.cl_waybill_number === null)
);

export const selectPurchases = createSelector(Purchases, (waybills) =>
    waybills.filter((waybill) => waybill.cl_waybill_number !== null)
);
