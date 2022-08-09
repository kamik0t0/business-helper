import { useEffect } from "react";
import {
    getPurchaseItemsBySaleId,
    updatePurchaseByPurchaseId,
} from "../../redux/actions/PurchasesAction";
import { useTypedSelector } from "../../redux/hooks/hooks";
import InvoiceComponent from "../create-invoice/Invoice";
import { useRequestInvoicePositions } from "../../components/waybills-service/common/hooks/useRequestInvoicePositions";

export default function UpdatePurchase() {
    const { Invoice } = useTypedSelector((state) => state.invoicesReducer);
    const requestPositions = useRequestInvoicePositions(
        getPurchaseItemsBySaleId
    );

    useEffect(() => {
        requestPositions(Invoice.id);
    }, []);
    return (
        <InvoiceComponent
            Info={["Поступление: изменение", "Продавец", "Purchase"]}
            updateAction={updatePurchaseByPurchaseId}
        />
    );
}
