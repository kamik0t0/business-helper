import React from "react";
import UpdateWaybill from "../../components/waybills-service/update-waybill/Update-waybill.jsx";

export default function UpdatePurchase({ purchases, setPurchases }) {
    return (
        <UpdateWaybill
            wbType={["Покупка товаров: создание", "Поставщик:", "Purchase"]}
            path="/purchases"
            waybills={purchases}
            setWaybills={setPurchases}
        />
    );
}
