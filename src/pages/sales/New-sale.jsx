// компонент создания накладной
import React from "react";
import NewWaybill from "../../components/waybills-service/NewWaybill.jsx";
import { sailsArr } from "../../utils/wbpositionClass.js";

export default function NewSale() {
    return (
        <NewWaybill
            wbType={["Покупка товаров: создание", "Поставщик:"]}
            path="/sales"
            wbItems={sailsArr}
        />
    );
}
