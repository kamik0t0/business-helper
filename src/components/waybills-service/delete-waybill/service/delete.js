import axios from "axios";
import { getData } from "../../../../utils/getData.ts";
import { setErrorTrueAction } from "../../../../redux/error-reducer.js";
import { setAuthAction } from "../../../../redux/auth-reducer.js";
import { modalManager } from "../../../../UI/modal/service/handlers/modal-control.js";

export function deleteWaybill(
    event,
    setModal,
    id,
    path,
    setLoader,
    setWaybills
) {
    return async function (dispatch) {
        event.preventDefault();
        const [, hideModal] = modalManager(setModal);
        const slicedPath = path.slice(0, -14);
        const [type, idType] =
            slicedPath === "/sales"
                ? ["SALES", "SaleId"]
                : ["PURCHASES", "PurchaseId"];
        setLoader();

        const OrgId = localStorage.getItem("OrgsId");
        try {
            await axios.delete(process.env.REACT_APP_URL_BASE + slicedPath, {
                params: {
                    [idType]: id,
                },
            });

            const WAYBILLS = await getData(
                process.env.REACT_APP_URL_BASE + slicedPath,
                { OrgId },
                () => dispatch(setAuthAction(true))
            );
            dispatch({ type, payload: WAYBILLS });
            // дополнительно обновляется локальный стейт в Waybill-list
            setWaybills([...WAYBILLS]);
            hideModal();
            setLoader();
        } catch (error) {
            console.log(error);
            dispatch(setErrorTrueAction(true, error.message));
            hideModal();
            setLoader();
        }
    };
}

// `http://localhost:5600${path.slice(0, -14)}`;
