// компонент создания накладной
import CreateInvoice from "../create-invoice/Create-invoice";
import { createSale } from "../../redux/actions/SalesAction";

export default function NewSale() {
    return (
        <>
            <CreateInvoice
                Info={["Продажа товаров: создание", "Покупатель:"]}
                createAction={createSale}
            />
        </>
    );
}
