// компонент показывающий список существующих накладных
import React, { useEffect } from "react";
import WayBillsList from "../../components/waybills-service/waybills/Waybill-list.jsx";
import { localStorateClearing } from "../../utils/localStorageClearing.js";

export default function Purchases({ purchases, setPurchases }) {
    useEffect(() => {
        localStorateClearing();
    }, []);
    return (
        <WayBillsList
            CounterPartyType={["Продавец", "Продавцу", "Покупки"]}
            path="/purchases/createwaybill"
            waybills={purchases}
            setWaybills={setPurchases}
        />
    );
}
