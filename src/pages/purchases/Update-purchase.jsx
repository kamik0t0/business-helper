import UpdateInvoice from "../update-invoice/UpdateInvoice";
import { getPurchaseItemsBySaleId } from "../../redux/actions/PurchasesAction";
import { updatePurchaseByPurchaseId } from "../../redux/actions/PurchasesAction";

export default function UpdatePurchase() {
    return (
        <UpdateInvoice
            Info={["Поступление: изменение", "Продавец", "Purchase", "№"]}
            requestInvoiceItemsAction={getPurchaseItemsBySaleId}
            updateAction={updatePurchaseByPurchaseId}
        />
    );
}
