// компонент создания накладной
import React from "react";
import NewWaybill from "../../components/waybills-service/NewWaybill.jsx";
import { purchaseArr } from "../../utils/wbpositionClass.js";

export default function NewPurchase() {
    return (
        <NewWaybill
            wbType={["Продажа товаров: создание", "Покупатель:"]}
            path="/purchases"
            wbItems={purchaseArr}
        />
    );
}
