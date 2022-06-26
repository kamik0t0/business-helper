import { checkInnKpp } from "../handlers/check-inn-kpp.js";
import { getData } from "../../../../../utils/getData.ts";
import axios from "axios";
import { setOrgsAction } from "../../../../../redux/orgs-reducer.js";
import { setErrorTrueAction } from "../../../../../redux/error-reducer.js";
import { setAuthAction } from "../../../../../redux/auth-reducer.js";
import { useState, useContext } from "react";
import { modalManager } from "../../../../../UI/modal/service/handlers/modal-control.js";
import { ModalContext } from "../../../../../blocks/content/Main.jsx";
import { useDispatch } from "react-redux";

export function useCreateOrg(organization) {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const { setModalAdd } = useContext(ModalContext);
    const [, hideModal] = modalManager(setModalAdd);

    function create(event) {
        event.preventDefault();
        return async (dispatch) => {
            if (checkInnKpp(organization) === false) return;

            try {
                setLoader(!loader);

                await axios.post(
                    process.env.REACT_APP_URL_PRIVATE_OFFICE,
                    organization,
                    {
                        params: {
                            table: "Orgs",
                            foreignKey: "UserId",
                        },
                    }
                );

                const ORGS = await getData(
                    process.env.REACT_APP_URL_PRIVATE_OFFICE,
                    { UserId: organization.UserId },
                    () => dispatch(setAuthAction(false))
                );

                setLoader(!loader);
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

    const createOrg = (event) => dispatch(create(event));

    return [loader, createOrg];
}

// url="https://deploy-test-business-assist.herokuapp.com/private"
