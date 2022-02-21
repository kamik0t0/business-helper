// компонент создания накладной
import React from "react";
import CreateWaybill from "../../components/waybills-service/create-waybill/Create-waybill.jsx";
import { sailsArr } from "../../utils/wbpositionClass.js";

export default function NewSale() {
    return (
        <CreateWaybill
            wbType={["Покупка товаров: создание", "Поставщик:"]}
            path="/sales"
            wbItems={sailsArr}
        />
    );
}
