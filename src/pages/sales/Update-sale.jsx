import {
    getSaleItemsBySaleId,
    updateSaleBySaleId,
} from "../../redux/actions/SalesAction";
import UpdateInvoice from "../update-invoice/UpdateInvoice";

export default function UpdateSale() {
    return (
        <UpdateInvoice
            Info={["Реализация: изменение", "Покупатель", "Sale"]}
            requestInvoiceItemsAction={getSaleItemsBySaleId}
            updateAction={updateSaleBySaleId}
        />
    );
}
