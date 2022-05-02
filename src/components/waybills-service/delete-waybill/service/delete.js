import { hideAnimatedModal } from "../../../../UI/modal/service/handlers/modal-control.js";
import axios from "axios";
import { getData } from "../../../../utils/getData.js";
import { setErrorTrueAction } from "../../../../redux/error-reducer.js";
import { setAuthAction } from "../../../../redux/auth-reducer.js";

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
        const [type, idType] =
            path.slice(0, -14) === "/sales"
                ? ["SALES", "SaleId"]
                : ["PURCHASES", "PurchaseId"];
        setLoader();

        const OrgId = localStorage.getItem("OrgsId");
        try {
            await axios.delete(`http://localhost:5600${path.slice(0, -14)}/`, {
                params: {
                    [idType]: id,
                },
            });

            const WAYBILLS = await getData(
                `http://localhost:5600${path.slice(0, -14)}/?OrgId=${OrgId}`,
                () => dispatch(setAuthAction(true))
            );
            dispatch({ type, payload: WAYBILLS });
            // дополнительно обновляется локальный стейт в Waybill-list
            setWaybills([...WAYBILLS]);
            hideAnimatedModal(setModal);
            setLoader();
        } catch (error) {
            console.log(error);
            dispatch(setErrorTrueAction(true, error.message));
            hideAnimatedModal(setModal);
            setLoader();
        }
    };
}

// `http://localhost:5600${path.slice(0, -14)}`;
