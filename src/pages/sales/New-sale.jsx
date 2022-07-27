// компонент создания накладной
import { createSale } from "../../redux/actions/SalesAction";
import CreateInvoice from "../create-invoice/Create-invoice";

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
