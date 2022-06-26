import axios from "axios";
import { getData } from "../../../../../utils/getData.ts";
import { setOrgsAction } from "../../../../../redux/orgs-reducer.js";
import { setErrorTrueAction } from "../../../../../redux/error-reducer.js";
import { setMyOrgAction } from "../../../../../redux/setMyOrg-reducer.js";
import { setAuthAction } from "../../../../../redux/auth-reducer.js";
import { useState, useContext } from "react";
import { ModalContext } from "../../../../../blocks/content/Main.jsx";
import { modalManager } from "../../../../../UI/modal/service/handlers/modal-control.js";

export function useDeleteOrg(OrgId, UserId) {
    const [loader, setLoader] = useState(false);
    const { setModalDelete } = useContext(ModalContext);
    const [, hideModal] = modalManager(setModalDelete);

    function deleteOrg(event) {
        event.preventDefault();
        return async (dispatch) => {
            setLoader(!loader);
            try {
                await axios.delete(process.env.REACT_APP_URL_PRIVATE_OFFICE, {
                    params: {
                        orgId: OrgId,
                        table: "Orgs",
                    },
                });

                const ORGS = await getData(
                    process.env.REACT_APP_URL_PRIVATE_OFFICE,
                    { UserId: UserId },
                    () => dispatch(setAuthAction(false))
                );
                dispatch(setMyOrgAction({}));
                setLoader(!loader);
                dispatch(setOrgsAction(ORGS));
                hideModal();
            } catch (error) {
                setLoader(!loader);
                dispatch(setErrorTrueAction(true, error.message));
                console.log(error.message);
                hideModal();
            }
        };
    }

    return [loader, deleteOrg];
}
