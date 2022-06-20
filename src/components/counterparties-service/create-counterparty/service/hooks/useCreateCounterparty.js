import { checkInnKpp } from "../handlers/check-inn-kpp.js";
import { Organizaton } from "../../../../../utils/Org.js";
import { getData } from "../../../../../utils/getData.ts";
import axios from "axios";
import { setCounterpartiesAction } from "../../../../../redux/counterparties-reducer.js";
import { setErrorTrueAction } from "../../../../../redux/error-reducer.js";
import { setAuthAction } from "../../../../../redux/auth-reducer.js";
import { useState, useContext } from "react";
import { modalManager } from "../../../../../UI/modal/service/handlers/modal-control.js";
import { ModalContext } from "../../../../../blocks/content/Main.jsx";

export function useCreateCounterparty(counterparty) {
    const [loader, setLoader] = useState(false);
    const { setModalAdd } = useContext(ModalContext);

    const [, hideModal] = modalManager(setModalAdd);

    function create(event) {
        return async (dispatch) => {
            event.preventDefault();

            if (checkInnKpp(counterparty) === false) return;

            try {
                counterparty["OrgId"] = localStorage.getItem("OrgsId");
                setLoader((loader) => !loader);

                await axios.post(
                    process.env.REACT_APP_URL_COUNTERPARTY,
                    counterparty,
                    {
                        params: {
                            foreignKey: "OrgsId",
                        },
                    }
                );

                const COUNTERPARTIES = await getData(
                    process.env.REACT_APP_URL_COUNTERPARTY,
                    { OrgId: counterparty.OrgId },
                    () => dispatch(setAuthAction(false))
                );

                counterparty = new Organizaton();
                dispatch(setCounterpartiesAction(COUNTERPARTIES));
                setLoader((loader) => !loader);
                hideModal();
            } catch (error) {
                console.log(error);
                dispatch(setErrorTrueAction(true, error.message));
                counterparty = new Organizaton();
                setLoader((loader) => !loader);
                hideModal();
            }
        };
    }
    return [loader, create];
}

// url="https://deploy-test-business-assist.herokuapp.com/private"
