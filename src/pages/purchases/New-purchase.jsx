import { createPurchase } from "../../redux/actions/PurchasesAction";
import CreateInvoice from "../create-invoice/Create-invoice";

export default function NewPurchase() {
    return (
        <CreateInvoice
            Info={["Покупка товаров: создание", "Поставщик:", "№"]}
            createAction={createPurchase}
        />
    );
}
