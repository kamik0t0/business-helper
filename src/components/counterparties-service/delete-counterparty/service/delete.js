import axios from "axios";
import { getData } from "../../../../utils/getData.ts";
import { setCounterpartiesAction } from "../../../../redux/counterparties-reducer.js";
import { setErrorTrueAction } from "../../../../redux/error-reducer.js";
import { setCounterpartyAction } from "../../../../redux/counterparty-reducer.js";
import { setAuthAction } from "../../../../redux/auth-reducer.js";

export function deleteCounterparty(setLoader) {
    return async function (dispatch) {
        setLoader();
        try {
            const counterpartyId = localStorage.getItem("counterpartyId");
            await axios.delete(process.env.REACT_APP_URL_COUNTERPARTY, {
                params: {
                    counterpartyId: counterpartyId,
                },
            });

            const OrgId = localStorage.getItem("OrgsId");
            const COUNTERPARTIES = await getData(
                process.env.REACT_APP_URL_COUNTERPARTY,
                { OrgId },
                () => dispatch(setAuthAction(false))
            );

            dispatch(setCounterpartyAction({}));
            dispatch(setCounterpartiesAction(COUNTERPARTIES));
            setLoader();
        } catch (error) {
            console.log(error);
            dispatch(setErrorTrueAction(true, error.message));
            setLoader();
        }
    };
}

// url="https://deploy-test-business-assist.herokuapp.com/private"
