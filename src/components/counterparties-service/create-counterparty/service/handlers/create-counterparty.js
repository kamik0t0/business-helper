import { checkInnKpp } from "./check-inn-kpp.js";
import { hideAnimatedModal } from "../../../../../UI/modal/service/handlers/modal-control.js";
import { Organizaton } from "../../../../../utils/Org.js";
import { getData } from "../../../../../utils/getData.js";
import axios from "axios";

export async function create(
    event,
    counterparty,
    loader,
    dispatch,
    setModal,
    dispatchError
) {
    event.preventDefault();
    // проверка ввода
    if (checkInnKpp(counterparty) === false) return;
    try {
        counterparty["OrgId"] = localStorage.getItem("OrgsId");
        loader();
        const result = await axios.post(
            "http://localhost:5600/counterparty/",
            counterparty,
            {
                params: {
                    foreignKey: "OrgsId",
                },
            }
        );
        if (result.data.created) {
            const ORGS = await getData(
                `/counterparty/?OrgId=${counterparty["OrgId"]}`,
                dispatch
            );
            loader();
            hideAnimatedModal(setModal);
            counterparty = new Organizaton();
            return ORGS;
        }
    } catch (error) {
        console.log(error);
        loader();
        dispatchError();
        dispatch();
        hideAnimatedModal(setModal);
        // обновляем поля
        counterparty = new Organizaton();
    }
}

// url="https://deploy-test-business-assist.herokuapp.com/private"
