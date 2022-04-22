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
    COUNTERPARTY,
    authCheck,
    errorCheck
) {
    event.preventDefault();
    Updated["id"] = localStorage.getItem("counterpartyId");
    console.log(Updated);
    // проверка ввода
    if (!checkInputs(Updated, COUNTERPARTY)) return;
    setLoader();
    try {
        console.log(Updated);
        const result = await axios.patch(
            "http://localhost:5600/counterparty/",
            Updated,
            {
                params: {
                    table: "counterparties",
                },
            }
        );
        if (result.data.updated) {
            const OrgId = localStorage.getItem("OrgsId");
            const COUNTERPARTIES = await getData(
                `/counterparty/?OrgId=${OrgId}`,
                authCheck
            );

            const UpCounterparty = showUpdateChanges(
                COUNTERPARTIES,
                COUNTERPARTY
            );
            setLoader();
            hideAnimatedModal(setModal);
            return [COUNTERPARTIES, UpCounterparty];
        }
    } catch (error) {
        console.log(error);
        setLoader(false);
        errorCheck();
        authCheck();
        hideAnimatedModal(setModal);
    }
}
