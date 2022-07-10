import React, { useState, useContext } from "react";
import axios from "axios";
import { ModalContext } from "../../../../blocks/content/Main";
import { modalManager } from "../../../../UI/modal/service/handlers/modal-control";
import { setAuth } from "../../../../redux/reducers/authSlice";
import { setCounterpartyAction } from "../../../../redux/counterparty-reducer";
import { setCounterpartiesAction } from "../../../../redux/counterparties-reducer";
import { setErrorTrueAction } from "../../../../redux/error-reducer";
import { getData } from "../../../../utils/getData";

export function useDeleteCounterparty() {
    const [loader, setLoader] = useState(false);
    const { setModalDelete } = useContext(ModalContext);
    const [, hideModal] = modalManager(setModalDelete);
    function deleteCounterparty(event) {
        return async function (dispatch) {
            event.preventDefault();
            setLoader((loader) => !loader);
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
                    () => dispatch(setAuth(false))
                );

                dispatch(setCounterpartyAction({}));
                dispatch(setCounterpartiesAction(COUNTERPARTIES));
                setLoader((loader) => !loader);
            } catch (error) {
                console.log(error);
                dispatch(setErrorTrueAction(true, error.message));
                setLoader((loader) => !loader);
            }
        };
    }

    return [loader, hideModal, deleteCounterparty];
}
