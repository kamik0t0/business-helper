import UpdateInvoice from "../update-invoice/UpdateInvoice";
import { getSaleItemsBySaleId } from "../../redux/actions/SalesAction";
import { updateSaleBySaleId } from "../../redux/actions/SalesAction";

export default function UpdateSale() {
    return (
        <UpdateInvoice
            Info={["Реализация: изменение", "Покупатель", "Sale"]}
            requestInvoiceItemsAction={getSaleItemsBySaleId}
            updateAction={updateSaleBySaleId}
        />
    );
}
