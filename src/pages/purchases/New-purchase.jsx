import CreateInvoice from "../create-invoice/Create-invoice";
import { createPurchase } from "../../redux/actions/PurchasesAction";

export default function NewPurchase() {
    return (
        <CreateInvoice
            Info={["Покупка товаров: создание", "Поставщик:", "№"]}
            createAction={createPurchase}
        />
    );
}
