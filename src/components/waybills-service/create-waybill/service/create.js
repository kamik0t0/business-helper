import { getDataByForeignKey } from "../../../../utils/getDataByForeignKey.js";

// создание накладной
export async function create(
    event,
    url,
    idName,
    ObjToSend,
    array,
    setArray,
    setNav
) {
    event.preventDefault();
    ObjToSend.current["positions"] = array;
    ObjToSend.current["myOrg"] = JSON.parse(localStorage.getItem("myOrg"));
    ObjToSend.current["counterparty"] = JSON.parse(
        localStorage.getItem("counterparty")
    );
    ObjToSend.current["counterpartyId"] =
        localStorage.getItem("counterpartyId");
    ObjToSend.current["orgId"] = localStorage.getItem("OrgsId");

    console.log(ObjToSend.current);
    // отправка запроса
    let response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ObjToSend.current),
    });
    // получение ответа
    let result = await response.json();
    // если в ответе есть поле created
    if (result.created) {
        console.log(url);
        console.log(idName);
        // // запрос на накладные
        let [res] = await getDataByForeignKey(url, idName);
        console.log(res);
        setArray(res);
        // навигация к списку накладных
        setNav(true);
    }
}
