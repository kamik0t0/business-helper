// компонент создания накладной
import React from "react";
import CreateWaybill from "../../components/waybills-service/create-waybill/Create-waybill.jsx";

export default function NewPurchase({ purchases, setPurchases }) {
    return (
        <CreateWaybill
            wbType={["Покупка товаров: создание", "Поставщик:"]}
            path="/purchases"
            waybills={purchases}
            setWaybills={setPurchases}
        />
    );
}
