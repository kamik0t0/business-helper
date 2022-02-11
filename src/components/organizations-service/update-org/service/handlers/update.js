import { getMyOrgsFromDB } from "../../../../../utils/getDataByForeignKey.js";
import { chooseOrg } from "../../../../../utils/getOrgs.js";
import { hideAnimatedModal } from "../../../../../UI/modal/service/handlers/modal-control.js";
import { checkInputs } from "./check-inputs.js";

export async function update(
    event,
    url,
    Updated,
    setLoader,
    setModal,
    type,
    org,
    setActiveOrg,
    dispatch
) {
    event.preventDefault();
    try {
        // + ИНН для идентификации обновляемой организации
        Updated["upINN"] = JSON.parse(localStorage.getItem(type)).inn;
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
            await getMyOrgsFromDB(
                `${url}/?UserId=${localStorage.getItem("UserId")}`
            );
            chooseOrg(org.id, type);
            setActiveOrg(JSON.parse(localStorage.getItem(type)));
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
