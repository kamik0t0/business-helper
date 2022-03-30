import { getDataByForeignKey } from "../../../../utils/getDataByForeignKey.js";
import { hideAnimatedModal } from "../../../../UI/modal/service/handlers/modal-control.js";

export async function deleteOrg(
    setModal,
    setOrgs,
    org,
    type,
    url,
    setLoader,
    dispatch,
    idName
) {
    setLoader(true);
    console.log(org.id);
    try {
        let response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        let result = await response.json();
        if (result.deleted) {
            console.log(result.message);
            let [orgs] = await getDataByForeignKey(url, idName);
            // убираем организацию из localStorage
            localStorage.removeItem(type);
            setOrgs(orgs);
            // модальное окно скрывается
            hideAnimatedModal(setModal);
            // убираем анимацию загрузки
            setLoader(false);
        } else {
            console.log(result.message);
        }
    } catch (error) {
        setLoader(false);
        // если проблема с сервером / базой данных или еще что-то
        dispatch({
            type: "isERROR_TRUE",
            payload: true,
            message: "No connection to server",
        });
        // меняем статус пользователя на неавторизованный
        dispatch({ type: "REG_FALSE", payload: false });
        // модальное окно скрывается
        hideAnimatedModal(setModal);
        console.log("No connection to server");
    }
}
