import { checkInputs } from "./check-inputs.js";
import { showUpdateChanges } from "../../../../../utils/showUpdateChanges.js";
import { getData } from "../../../../../utils/getData.js";
import axios from "axios";
// import { setRegFalseAction } from "../../../../../redux/auth-reducer.js";
import { setCounterpartiesAction } from "../../../../../redux/counterparties-reducer.js";
import { setCounterpartyAction } from "../../../../../redux/counterparty-reducer.js";
import { setErrorTrueAction } from "../../../../../redux/error-reducer.js";
import { setAuthAction } from "../../../../../redux/auth-reducer.js";

export function update(event, Updated, setLoader, COUNTERPARTY) {
    return async function (dispatch) {
        event.preventDefault();
        Updated["id"] = COUNTERPARTY.id;
        // проверка ввода
        if (!checkInputs(Updated, COUNTERPARTY)) return;
        setLoader();
        try {
            await axios.patch(process.env.REACT_APP_URL_COUNTERPARTY, Updated, {
                params: {
                    table: "counterparties",
                },
            });

            const OrgId = localStorage.getItem("OrgsId");
            const COUNTERPARTIES = await getData(
                process.env.REACT_APP_URL_COUNTERPARTY,
                { OrgId },
                () => dispatch(setAuthAction(false))
            );

            const UpdatedCounterparty = showUpdateChanges(
                COUNTERPARTIES,
                COUNTERPARTY
            );
            setLoader();
            dispatch(setCounterpartiesAction(COUNTERPARTIES));
            dispatch(setCounterpartyAction(UpdatedCounterparty));
        } catch (error) {
            console.log(error);
            dispatch(setErrorTrueAction(true, error.message));
            setLoader();
        }
    };
}
