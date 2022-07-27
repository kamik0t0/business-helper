import {
    getPurchaseItemsBySaleId,
    updatePurchaseByPurchaseId,
} from "../../redux/actions/PurchasesAction";
import UpdateInvoice from "../update-invoice/UpdateInvoice";

export default function UpdatePurchase() {
    return (
        <UpdateInvoice
            Info={["Поступление: изменение", "Продавец", "Purchase", "№"]}
            requestInvoiceItemsAction={getPurchaseItemsBySaleId}
            updateAction={updatePurchaseByPurchaseId}
        />
    );
}
