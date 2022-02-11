// компонент показывающий список существующих накладных
import React from "react";
import WayBillsList from "../../components/waybills-service/WayBillsList.jsx";

export default function Sales() {
    return (
        <WayBillsList
            CounterPartyType={["Продавец", "Продавцу", "Покупки"]}
            path="/sales/createwaybill"
        />
    );
}
