import { getDataByForeignKey } from "../../../../utils/getDataByForeignKey.js";

// создание накладной
export async function create(
    event,
    url,
    idName,
    PostWaybillObj,
    array,
    setNavToList
) {
    event.preventDefault();
    PostWaybillObj.current["positions"] = array;
    PostWaybillObj.current["myOrg"] = JSON.parse(localStorage.getItem("myOrg"));
    PostWaybillObj.current["counterparty"] = JSON.parse(
        localStorage.getItem("counterparty")
    );
    PostWaybillObj.current["counterpartyId"] =
        localStorage.getItem("counterpartyId");
    PostWaybillObj.current["orgId"] = localStorage.getItem("OrgsId");

    console.log(PostWaybillObj.current);
    // отправка запроса
    let response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(PostWaybillObj.current),
    });
    // получение ответа
    let result = await response.json();
    // если в ответе есть поле created
    if (result.created) {
        console.log(url);
        console.log(idName);
        // запрос на накладные
        let [res] = await getDataByForeignKey(url, idName);
        console.log(res);
        // навигация к списку накладных
        setNavToList(true);
    }
}
