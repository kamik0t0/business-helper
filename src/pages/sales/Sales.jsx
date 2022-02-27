// компонент показывающий список существующих накладных
import React, { useEffect } from "react";
import WayBillsList from "../../components/waybills-service/waybills/Waybill-list.jsx";
import { localStorateClearing } from "../../utils/localStorageClearing.js";

export default function Sales({ sales, setSales }) {
    useEffect(() => {
        localStorateClearing();
    }, []);
    return (
        <WayBillsList
            CounterPartyType={["Покупатель", "Покупателю", "Продажи"]}
            path="/sales/createwaybill"
            waybills={sales}
            setWaybills={setSales}
        />
    );
}
