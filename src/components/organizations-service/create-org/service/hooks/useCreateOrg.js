import { checkInnKpp } from "../handlers/check-inn-kpp.js";
import { Organizaton } from "../../../../../utils/Org.js";
import { getData } from "../../../../../utils/getData.js";
import axios from "axios";
import { setOrgsAction } from "../../../../../redux/orgs-reducer.js";
import { setErrorTrueAction } from "../../../../../redux/error-reducer.js";
import { setAuthAction } from "../../../../../redux/auth-reducer.js";
import { useState, useContext } from "react";
import { modalManager } from "../../../../../UI/modal/service/handlers/modal-control.js";
import { ModalContext } from "../../../../../blocks/content/Main.jsx";

export function useCreateOrg(organization) {
    const [loader, setLoader] = useState(false);
    const { setModalAdd } = useContext(ModalContext);

    const [, hideModal] = modalManager(setModalAdd);

    function create(event) {
        return async (dispatch) => {
            event.preventDefault();

            if (checkInnKpp(organization) === false) return;

            try {
                organization["UserId"] = localStorage.getItem("UserId");
                setLoader(!loader);

                await axios.post(
                    "http://localhost:5600/private/",
                    organization,
                    {
                        params: {
                            table: "Orgs",
                            foreignKey: "UserId",
                        },
                    }
                );

                const ORGS = await getData(
                    `/private/?UserId=${organization["UserId"]}`,
                    () => dispatch(setAuthAction(false))
                );

                setLoader(!loader);
                organization = new Organizaton();
                dispatch(setOrgsAction(ORGS));
                hideModal();
            } catch (error) {
                console.log(error);
                dispatch(setErrorTrueAction(true, error.message));
                organization = new Organizaton();
                setLoader(!loader);
                hideModal();
            }
        };
    }
    return [loader, create];
}

// url="https://deploy-test-business-assist.herokuapp.com/private"
