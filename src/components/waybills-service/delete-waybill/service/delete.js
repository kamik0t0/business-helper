import { getDataByForeignKey } from "../../../../utils/getDataByForeignKey.js";
import { hideAnimatedModal } from "../../../../UI/modal/service/handlers/modal-control.js";

export async function deleteWaybill(
    event,
    setModal,
    waybill,
    setWaybills,
    path,
    url,
    setLoader,
    dispatch
) {
    event.preventDefault();
    setLoader(true);
    let idName = path.slice(1).slice(0, -14);
    const WaybillId = waybill.id;

    try {
        let response = await fetch(`${url}/?${idName}Id=${WaybillId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        let result = await response.json();
        if (result.deleted) {
            console.log(result.message);
            let [waybills] = await getDataByForeignKey(
                `${url}/?OrgId=${localStorage.getItem("OrgsId")}`,
                idName
            );
            setWaybills([...waybills]);
            hideAnimatedModal(setModal);
            setLoader(false);
        } else {
            console.log(result.message);
        }
    } catch (error) {
        setLoader(false);
        // dispatch({
        //     type: "isERROR_TRUE",
        //     payload: true,
        //     message: "No connection to server",
        // });
        // // меняем статус пользователя на неавторизованный
        // dispatch({ type: "REG_FALSE", payload: false });
        // // модальное окно скрывается
        hideAnimatedModal(setModal);
        console.log("No connection to server");
    }
}
