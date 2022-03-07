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
    id
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
    PatchWaybillObj.current["orgId"] = localStorage.getItem("OrgsId");
    PatchWaybillObj.current["id"] = id;

    console.log(PatchWaybillObj.current);
    // отправка запроса
    let response = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(PatchWaybillObj.current),
    });
    // получение ответа
    let result = await response.json();
    // если в ответе есть поле created
    if (result.updated) {
        console.log(url);
        console.log(idName);
        // запрос на накладные
        let [res] = await getDataByForeignKey(url, idName);
        console.log(res);

        // навигация к списку накладных
        setNav(true);
    }
}
