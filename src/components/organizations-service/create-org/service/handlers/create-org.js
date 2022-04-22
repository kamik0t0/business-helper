import { checkInnKpp } from "./check-inn-kpp.js";
import { hideAnimatedModal } from "../../../../../UI/modal/service/handlers/modal-control.js";
import { Organizaton } from "../../../../../utils/Org.js";
import { getData } from "../../../../../utils/getData.js";
import axios from "axios";
import { setOrgsAction } from "../../../../../redux/orgs-reducer.js";
import { setErrorTrueAction } from "../../../../../redux/error-reducer.js";
import { setRegFalseAction } from "../../../../../redux/auth-reducer.js";

export function create(event, organization, loader, setModal) {
    return async function createWithThunk(dispatch) {
        event.preventDefault();

        if (checkInnKpp(organization) === false) return;

        try {
            organization["UserId"] = localStorage.getItem("UserId");
            loader();

            await axios.post("http://localhost:5600/private/", organization, {
                params: {
                    table: "Orgs",
                    foreignKey: "UserId",
                },
            });

            const ORGS = await getData(
                `/private/?UserId=${organization["UserId"]}`,
                () => dispatch(setRegFalseAction(false))
            );

            loader();
            organization = new Organizaton();
            dispatch(setOrgsAction(ORGS));
            hideAnimatedModal(setModal);
        } catch (error) {
            console.log(error);
            dispatch(setErrorTrueAction(true, error.message));
            organization = new Organizaton();
            hideAnimatedModal(setModal);
            loader();
        }
    };
}

// url="https://deploy-test-business-assist.herokuapp.com/private"
