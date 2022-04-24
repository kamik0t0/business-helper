import { checkInnKpp } from "./check-inn-kpp.js";
import { Organizaton } from "../../../../../utils/Org.js";
import { getData } from "../../../../../utils/getData.js";
import axios from "axios";
import { setCounterpartiesAction } from "../../../../../redux/counterparties-reducer.js";
import { setErrorTrueAction } from "../../../../../redux/error-reducer.js";
// import { setRegFalseAction } from "../../../../../redux/auth-reducer.js";
import { setAuthAction } from "../../../../../redux/auth-reducer.js";

export function create(event, counterparty, loader) {
    return async function createWithThunk(dispatch) {
        event.preventDefault();
        // проверка ввода
        if (checkInnKpp(counterparty) === false) return;
        try {
            counterparty["OrgId"] = localStorage.getItem("OrgsId");
            loader();
            await axios.post(
                "http://localhost:5600/counterparty/",
                counterparty,
                {
                    params: {
                        foreignKey: "OrgsId",
                    },
                }
            );

            const COUNTERPARTIES = await getData(
                `/counterparty/?OrgId=${counterparty["OrgId"]}`,
                () => dispatch(setAuthAction(false))
            );

            counterparty = new Organizaton();
            dispatch(setCounterpartiesAction(COUNTERPARTIES));
            loader();
        } catch (error) {
            console.log(error);
            dispatch(setErrorTrueAction(true, error.message));
            counterparty = new Organizaton();
            loader();
        }
    };
}

// url="https://deploy-test-business-assist.herokuapp.com/private"
