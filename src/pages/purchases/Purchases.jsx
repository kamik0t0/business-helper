// компонент показывающий список существующих накладных
import React from "react";
import WayBillsList from "../../components/waybills-service/waybills/Waybill-list.jsx";

export default function Purchases({ purchases, setPurchases }) {
    return (
        <WayBillsList
            CounterPartyType={["Продавец", "Продавцу", "Покупки"]}
            path="/purchases/createwaybill"
            waybills={purchases}
            setWaybills={setPurchases}
        />
    );
}
