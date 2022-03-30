import { getDataByForeignKey } from "../../../../../utils/getDataByForeignKey.js";
import { hideAnimatedModal } from "../../../../../UI/modal/service/handlers/modal-control.js";
import { checkInputs } from "./check-inputs.js";
import { showUpdateChanges } from "../../../../../utils/showUpdateChanges.js";

export async function update(
    event,
    url,
    Updated,
    setLoader,
    setModal,
    type,
    org,
    setOrg,
    dispatch,
    idType
) {
    event.preventDefault();
    try {
        // + ИНН для идентификации обновляемой организации
        Updated["id"] = JSON.parse(localStorage.getItem(type)).id;
    } catch (error) {
        console.log("Session expired... Authorize again");
    }
    // проверка ввода
    if (checkInputs(Updated, org) === false) return;
    setLoader(true);
    try {
        let response = await fetch(url, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Updated),
        });

        let result = await response.json();
        if (result.updated) {
            console.log(result);
            // заружаем список организаций из БД
            let [orgs] = await getDataByForeignKey(url, idType);
            showUpdateChanges(orgs, setOrg, org, type);
            setLoader(false);
            hideAnimatedModal(setModal);
        }
    } catch (error) {
        setLoader(false);
        dispatch({
            type: "isERROR_TRUE",
            payload: true,
            message: "No connection to server",
        });
        dispatch({ type: "REG_FALSE", payload: false });
        hideAnimatedModal(setModal);
        console.log("no connection to server");
    }
}
