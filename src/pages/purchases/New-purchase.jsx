import { createPurchase } from "../../redux/actions/PurchasesAction";
import InvoiceComponent from "../create-invoice/Invoice";

export default function NewPurchase() {
    return (
        <InvoiceComponent
            Info={["Покупка товаров: создание", "Поставщик:", "№"]}
            createAction={createPurchase}
        />
    );
}
