// компонент создания накладной
import React from "react";
import CreateWaybill from "../../components/waybills-service/create-waybill/Create-waybill.jsx";

export default function NewSale() {
    return (
        <CreateWaybill
            CounterpartyType={["Продажа товаров: создание", "Покупатель:"]}
            path="/sales"
        />
    );
}
