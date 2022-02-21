// компонент создания накладной
import React from "react";
import CreateWaybill from "../../components/waybills-service/create-waybill/Create-waybill.jsx";
import { purchaseArr } from "../../utils/wbpositionClass.js";

export default function NewPurchase() {
    return (
        <CreateWaybill
            wbType={["Продажа товаров: создание", "Покупатель:"]}
            path="/purchases"
            wbItems={purchaseArr}
        />
    );
}
