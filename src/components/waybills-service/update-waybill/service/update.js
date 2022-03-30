import { getDataByForeignKey } from "../../../../utils/getDataByForeignKey.js";
export async function update(
    event,
    url,
    idName,
    PatchWaybillObj,
    array,
    setNav,
    Waybill_date,
    counterparty,
    WaybillId
) {
    event.preventDefault();
    PatchWaybillObj.current["Waybill_date"] = Waybill_date;
    PatchWaybillObj.current["positions"] = array;
    PatchWaybillObj.current["myOrg"] = JSON.parse(
        localStorage.getItem("myOrg")
    );
    PatchWaybillObj.current["counterparty"] = counterparty;
    PatchWaybillObj.current["counterpartyId"] =
        counterparty.CounterpartyId || counterparty.id;

    console.log(PatchWaybillObj.current);
    // отправка запроса
    let response = await fetch(`${url}?table=${idName}&id=${WaybillId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(PatchWaybillObj.current),
    });
    // получение ответа
    let result = await response.json();

    if (result.updated) {
        // запрос на накладные
        await getDataByForeignKey(
            `${url}?OrgId=${JSON.parse(localStorage.getItem("myOrg")).id}`,
            idName
        );
        setNav(true);
    }
}
