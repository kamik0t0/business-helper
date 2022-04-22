import { getDataByForeignKey } from "../../../../../utils/getDataByForeignKey.js";
import { hideAnimatedModal } from "../../../../../UI/modal/service/handlers/modal-control.js";
import { checkInputs } from "./check-inputs.js";
import { showUpdateChanges } from "../../../../../utils/showUpdateChanges.js";
import { getData } from "../../../../../utils/getData.js";
import axios from "axios";

export async function update(
    event,
    Updated,
    setLoader,
    setModal,
    MYORG,
    authCheck,
    errorCheck
) {
    event.preventDefault();
    Updated["id"] = localStorage.getItem("OrgsId");
    // проверка ввода
    if (!checkInputs(Updated, MYORG)) return;
    setLoader();
    try {
        const result = await axios.patch(
            "http://localhost:5600/private/",
            Updated,
            {
                params: {
                    table: "Orgs",
                },
            }
        );

        if (result.data.updated) {
            const UserId = localStorage.getItem("UserId");
            const ORGS = await getData(
                `/private/?table=Orgs&UserId=${UserId}`,
                "orgs",
                authCheck
            );

            const UpOrg = showUpdateChanges(ORGS, MYORG);
            setLoader();
            hideAnimatedModal(setModal);
            return [ORGS, UpOrg];
        }
    } catch (error) {
        console.log(error);
        setLoader(false);
        errorCheck();
        authCheck();
        hideAnimatedModal(setModal);
    }
}
