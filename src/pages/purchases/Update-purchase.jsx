import React from "react";
import UpdateWaybill from "../../components/waybills-service/update-waybill/Update-waybill.jsx";

export default function UpdatePurchase() {
    return (
        <UpdateWaybill
            CounterPartyType={[
                "Поступление: изменение",
                "Продавец",
                "Purchase",
                "№",
            ]}
            path="/purchases"
        />
    );
}
