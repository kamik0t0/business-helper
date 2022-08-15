import { useEffect } from "react";
import {
    getSaleItemsBySaleId,
    updateSaleBySaleId,
} from "../../redux/actions/SalesAction";
import { useTypedSelector } from "../../redux/hooks/hooks";
import InvoiceComponent from "../create-invoice/Invoice";
import { useRequestInvoicePositions } from "../../components/waybills-service/common/hooks/useRequestInvoicePositions";

const UpdateSale: React.FC = () => {
    const { Invoice } = useTypedSelector((state) => state.invoicesReducer);
    const requestPositions = useRequestInvoicePositions(getSaleItemsBySaleId);

    useEffect(() => {
        if (Invoice !== null) requestPositions(Invoice.id);
    }, []);

    return (
        <InvoiceComponent
            Info={["Реализация: изменение", "Покупатель", "Sale"]}
            action={updateSaleBySaleId}
        />
    );
};

export default UpdateSale;
