import { checkInputs } from "../handlers/check-inputs.js";
import { showUpdateChanges } from "../../../../../utils/showUpdateChanges.js";
import { getData } from "../../../../../utils/getData.ts";
import axios from "axios";
import { setOrgsAction } from "../../../../../redux/orgs-reducer.js";
import { setErrorTrueAction } from "../../../../../redux/error-reducer.js";
import { setMyOrgAction } from "../../../../../redux/setMyOrg-reducer.js";
import { setAuthAction } from "../../../../../redux/auth-reducer.js";
import { useState, useContext, useRef } from "react";
import { modalManager } from "../../../../../UI/modal/service/handlers/modal-control.js";
import { ModalContext } from "../../../../../blocks/content/Main.jsx";
import { Organizaton } from "../../../../../utils/Org.js";

export function usePatchOrg(Org) {
    const [loader, setLoader] = useState(false);
    const { setModalUpdate } = useContext(ModalContext);
    const UpdateData = useRef(new Organizaton());
    const [, hideModal] = modalManager(setModalUpdate);

    function update(event) {
        return async (dispatch) => {
            event.preventDefault();

            UpdateData.current["id"] = Org.id;

            if (!checkInputs(UpdateData, Org)) return;

            setLoader(!loader);

            try {
                await axios.patch(
                    process.env.REACT_APP_URL_PRIVATE_OFFICE,
                    UpdateData.current,
                    {
                        params: {
                            table: "Orgs",
                        },
                    }
                );

                const UserId = localStorage.getItem("UserId");
                const ORGS = await getData(
                    process.env.REACT_APP_URL_PRIVATE_OFFICE,
                    { table: "Orgs", UserId },
                    () => dispatch(setAuthAction(false))
                );

                const UpdatedOrg = showUpdateChanges(
                    ORGS,
                    UpdateData.current.id
                );

                dispatch(setMyOrgAction(UpdatedOrg));
                dispatch(setOrgsAction(ORGS));

                hideModal();
            } catch (error) {
                console.log(error);

                dispatch(setErrorTrueAction(true, error.message));
                setLoader(!loader);

                hideModal();
            }
        };
    }
    return [loader, UpdateData, update];
}

// url="https://deploy-test-business-assist.herokuapp.com/private"
