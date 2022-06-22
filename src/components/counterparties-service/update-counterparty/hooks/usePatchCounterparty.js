import { useState, useContext, useRef } from "react";
import { checkInputs } from "../service/handlers/check-inputs.js";
import { showUpdateChanges } from "../../../../utils/showUpdateChanges.js";
import { getData } from "../../../../utils/getData.ts";
import axios from "axios";
import { setErrorTrueAction } from "../../../../redux/error-reducer.js";
import { setCounterpartyAction } from "../../../../redux/counterparty-reducer.js";
import { setCounterpartiesAction } from "../../../../redux/counterparties-reducer.js";
import { setAuthAction } from "../../../../redux/auth-reducer.js";
import { modalManager } from "../../../../UI/modal/service/handlers/modal-control.js";
import { ModalContext } from "../../../../blocks/content/Main.jsx";
import { Organizaton } from "../../../../utils/Org.js";
import { useDispatch } from "react-redux";
import { getValue } from "../service/handlers/get-value.js";
import { setValue } from "../service/handlers/set-value.js";

export function usePatchCounterparty(COUNTERPARTY) {
    const dispatch = useDispatch();

    const [loader, setLoader] = useState(false);

    const UpdateData = useRef(new Organizaton());

    const { setModalUpdate } = useContext(ModalContext);
    const [, hideModal] = modalManager(setModalUpdate);

    function update(event) {
        return async (dispatch) => {
            event.preventDefault();

            UpdateData.current["id"] = COUNTERPARTY.id;
            if (!checkInputs(UpdateData, COUNTERPARTY)) return;
            setLoader(!loader);

            try {
                await axios.patch(
                    process.env.REACT_APP_URL_COUNTERPARTY,
                    UpdateData.current,
                    {
                        params: {
                            table: "counterparties",
                        },
                    }
                );

                const OrgId = localStorage.getItem("OrgsId");

                const COUNTERPARTIES = await getData(
                    process.env.REACT_APP_URL_COUNTERPARTY,
                    { OrgId },
                    () => dispatch(setAuthAction(false))
                );

                const UpdatedCounterparty = showUpdateChanges(
                    COUNTERPARTIES,
                    UpdateData.current.id
                );
                dispatch(setCounterpartyAction(UpdatedCounterparty));
                dispatch(setCounterpartiesAction(COUNTERPARTIES));
                setLoader((loader) => !loader);
                hideModal();
            } catch (error) {
                console.log(error);

                dispatch(setErrorTrueAction(true, error.message));
                setLoader((loader) => !loader);

                hideModal();
            }
        };
    }

    const getInputValue = (event, field, length) =>
        getValue(event, field, length, UpdateData);

    const setInputValue = (event, field, length) =>
        setValue(event, field, length, UpdateData);

    const dispatchUpdate = (event) => {
        dispatch(update(event));
    };

    return [loader, hideModal, getInputValue, setInputValue, dispatchUpdate];
}

// url="https://deploy-test-business-assist.herokuapp.com/private"
