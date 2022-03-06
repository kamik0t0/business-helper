import { getDataByForeignKey } from "../../../../utils/getDataByForeignKey.js";
export async function update(
    event,
    url,
    idName,
    ObjToSend,
    array,
    setNav,
    Waybill_date,
    counterparty,
    id
) {
    event.preventDefault();
    ObjToSend.current["Waybill_date"] = Waybill_date;
    ObjToSend.current["positions"] = array;
    ObjToSend.current["myOrg"] = JSON.parse(localStorage.getItem("myOrg"));
    ObjToSend.current["counterparty"] = counterparty;
    ObjToSend.current["counterpartyId"] =
        counterparty.CounterpartyId || counterparty.id;
    ObjToSend.current["orgId"] = localStorage.getItem("OrgsId");
    ObjToSend.current["id"] = id;

    console.log(ObjToSend.current);
    // отправка запроса
    let response = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ObjToSend.current),
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
