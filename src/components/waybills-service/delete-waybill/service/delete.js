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
            let [waybills] = await getDataByForeignKey(
                `${url}/?OrgId=${localStorage.getItem("OrgsId")}`,
                idName
            );
            setWaybills([...waybills]);
            hideAnimatedModal(setModal);
            setLoader(false);
        }
    } catch (error) {
        setLoader(false);
        hideAnimatedModal(setModal);
        console.log(error.message);
    }
}
