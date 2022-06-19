import React from "react";
import UpdateWaybill from "../../components/waybills-service/update-waybill/Update-waybill.jsx";

export default function UpdatePurchase() {
    return (
        <UpdateWaybill
            CounterpartyInfo={[
                "Поступление: изменение",
                "Продавец",
                "Purchase",
                "№",
            ]}
        />
    );
}
