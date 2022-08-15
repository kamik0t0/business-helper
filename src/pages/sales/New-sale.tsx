// компонент создания накладной
import { createSale } from "../../redux/actions/SalesAction";
import InvoiceComponent from "../create-invoice/Invoice";

const NewSale: React.FC = () => {
    return (
        <>
            <InvoiceComponent
                Info={["Продажа товаров: создание", "Покупатель:"]}
                action={createSale}
            />
        </>
    );
};

export default NewSale;
