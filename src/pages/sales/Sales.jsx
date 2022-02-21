// компонент показывающий список существующих накладных
import React from "react";
import WayBillsList from "../../components/waybills-service/waybills/Waybill-list.jsx";

export default function Sales() {
    return (
        <WayBillsList
            CounterPartyType={["Покупатель", "Покупателю", "Продажи"]}
            path="/purchases/createwaybill"
        />
    );
}
