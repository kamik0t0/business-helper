import { createPurchase } from "../../redux/actions/PurchasesAction";
import InvoiceComponent from "../create-invoice/Invoice";

const NewPurchase: React.FC = () => {
    return (
        <InvoiceComponent
            Info={["Покупка товаров: создание", "Поставщик:", "№"]}
            action={createPurchase}
        />
    );
};
export default NewPurchase;
