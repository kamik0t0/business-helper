import { useEffect } from "react";
import {
    getPurchaseItemsBySaleId,
    updatePurchaseByPurchaseId,
} from "../../redux/actions/PurchasesAction";
import { useTypedSelector } from "../../redux/hooks/hooks";
import InvoiceComponent from "../create-invoice/Invoice";
import { useRequestInvoicePositions } from "../../components/waybills-service/common/hooks/useRequestInvoicePositions";

const UpdatePurchase: React.FC = () => {
    const { Invoice } = useTypedSelector((state) => state.invoicesReducer);
    const requestPositions = useRequestInvoicePositions(
        getPurchaseItemsBySaleId
    );

    useEffect(() => {
        if (Invoice !== null) requestPositions(Invoice.id);
    }, []);
    return (
        <InvoiceComponent
            Info={["Поступление: изменение", "Продавец", "Purchase"]}
            action={updatePurchaseByPurchaseId}
        />
    );
};

export default UpdatePurchase;
