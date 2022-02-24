// компонент создания накладной
import React from "react";
import CreateWaybill from "../../components/waybills-service/create-waybill/Create-waybill.jsx";

export default function NewSale({ sales, setSales }) {
    return (
        <CreateWaybill
            wbType={["Продажа товаров: создание", "Покупатель:"]}
            path="/sales"
            waybills={sales}
            setWaybills={setSales}
        />
    );
}
