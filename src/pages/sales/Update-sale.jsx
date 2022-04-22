import React from "react";
import UpdateWaybill from "../../components/waybills-service/update-waybill/Update-waybill.jsx";

export default function UpdateSale() {
    return (
        <UpdateWaybill
            CounterpartyInfo={["Реализация: изменение", "Покупатель", "Sale"]}
            path="/sales"
        />
    );
}
