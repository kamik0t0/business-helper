import { useState, useContext } from "react";
import axios from "axios";
import { getData } from "../../../../utils/getData.ts";
import { setErrorTrueAction } from "../../../../redux/error-reducer.js";
import { setAuthAction } from "../../../../redux/auth-reducer.js";
import { modalManager } from "../../../../UI/modal/service/handlers/modal-control.js";
import { ModalContext } from "../../../../blocks/content/Main";
import { useLocation, useParams } from "react-router-dom";

export function useDeleteWaybill(id) {
    const [loader, setLoader] = useState(false);
    const { setModalDelete } = useContext(ModalContext);
    const [, hideDeleteModal] = modalManager(setModalDelete);
    const { pathname } = useLocation();
    const { orgId } = useParams();

    function deleteWaybill(event) {
        return async function (dispatch) {
            event.preventDefault();

            const [type, idType, URL] =
                pathname === `/sales/${orgId}`
                    ? ["SALES", "SaleId", process.env.REACT_APP_URL_SALES]
                    : [
                          "PURCHASES",
                          "PurchaseId",
                          process.env.REACT_APP_URL_PURCHASES,
                      ];
            setLoader((prev) => !prev);

            const OrgId = localStorage.getItem("OrgsId");
            try {
                await axios.delete(URL, {
                    params: {
                        [idType]: id,
                    },
                });

                const WAYBILLS = await getData(URL, { OrgId }, () =>
                    dispatch(setAuthAction(true))
                );
                dispatch({ type, payload: WAYBILLS });
                // дополнительно обновляется локальный стейт в Waybill-list
                hideDeleteModal();
                setLoader((prev) => !prev);
            } catch (error) {
                console.log(error);
                dispatch(setErrorTrueAction(true, error.message));
                hideDeleteModal();
                setLoader((prev) => !prev);
            }
        };
    }

    return [loader, hideDeleteModal, deleteWaybill];
}
