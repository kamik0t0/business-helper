import { getMyOrgsFromDB } from "../../../../../utils/getDataByForeignKey.js";
import { hideAnimatedModal } from "../../../../../UI/modal/service/handlers/modal-control.js";

export async function deleteOrg(
    setModal,
    setActiveOrg,
    myOrg,
    type,
    url,
    setLoader,
    dispatch
) {
    setLoader(true);
    try {
        let response = await fetch(`${url}/?orgId=${myOrg.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        let result = await response.json();
        if (result.deleted) {
            console.log(result.message);
            await getMyOrgsFromDB(
                `${url}/?UserId=${localStorage.getItem("UserId")}`
            );
        } else {
            console.log(result.message);
        }
        // убираем организацию из localStorage
        setActiveOrg(localStorage.removeItem(type));
        // модальное окно скрывается
        hideAnimatedModal(setModal);
        // убираем анимацию загрузки
        setLoader(false);
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
