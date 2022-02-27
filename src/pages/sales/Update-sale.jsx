import React from "react";
import UpdateWaybill from "../../components/waybills-service/update-waybill/Update-waybill.jsx";

export default function UpdateSale({ sales, setSales }) {
    return (
        <UpdateWaybill
            wbType={["Продажа товаров: создание", "Покупатель:", "Sale"]}
            path="/sales"
            waybills={sales}
            setWaybills={setSales}
        />
    );
}
