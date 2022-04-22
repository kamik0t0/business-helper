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

export function getPositions(path, id) {
    switch (path) {
        case "/sales":
            return getSaleItemsFromDB(
                `http://localhost:5600${path.slice(0, -1)}/?SaleId=${id}`
            );
        case "/purchases":
            return getPurchaseItemsFromDB(
                `http://localhost:5600${path.slice(0, -1)}/?PurchaseId=${id}`
            );
        default:
            break;
    }
}
