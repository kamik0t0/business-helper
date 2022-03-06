// компонент создания накладной
import React from "react";
import CreateWaybill from "../../components/waybills-service/create-waybill/Create-waybill.jsx";

export default function NewPurchase() {
    return (
        <CreateWaybill
            wbType={["Покупка товаров: создание", "Поставщик:"]}
            path="/purchases"
            WB={JSON.parse(localStorage.getItem("Purchases"))}
        />
    );
}
