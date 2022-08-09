// компонент создания накладной
import { createSale } from "../../redux/actions/SalesAction";
import InvoiceComponent from "../create-invoice/Invoice";

export default function NewSale() {
    return (
        <>
            <InvoiceComponent
                Info={["Продажа товаров: создание", "Покупатель:"]}
                action={createSale}
            />
        </>
    );
}
