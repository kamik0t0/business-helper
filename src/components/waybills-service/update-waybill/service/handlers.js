import {
    getSaleItemsFromDB,
    getPurchaseItemsFromDB,
} from "../../../../utils/getDataByForeignKey";

export function getCounterpartyRequisitesFromWaybill(waybill) {
    return Object.fromEntries(
        Object.entries(waybill).filter(
            (obj) =>
                Object.values(obj)[0].includes("cl_") ||
                Object.values(obj)[0].includes("CounterpartyId")
        )
    );
}
