import axios from "axios";
import { getData } from "../../../../utils/getData.js";
import { setErrorTrueAction } from "../../../../redux/error-reducer.js";
import { setAuthAction } from "../../../../redux/auth-reducer.js";

// создание накладной
export function create(event, path, WAYBILL, positions, setNavToList, type) {
    return async function (dispatch) {
        event.preventDefault();
        WAYBILL.current["positions"] = positions;
        const OrgId = localStorage.getItem("OrgsId");
        WAYBILL.current["OrgId"] = OrgId;
        try {
            await axios.post(
                process.env.REACT_APP_URL_BASE + path,
                WAYBILL.current,
                {
                    params: {
                        table: path.slice(1),
                        OrgId: OrgId,
                        CounterpartyId: localStorage.getItem("counterpartyId"),
                    },
                }
            );

            const WAYBILLS = await getData(
                process.env.REACT_APP_URL_BASE + path,
                { OrgId },
                () => dispatch(setAuthAction(true))
            );
            dispatch({ type, payload: WAYBILLS });
            setNavToList();
        } catch (error) {
            console.log(error);
            dispatch(setErrorTrueAction(true, error.message));
            setNavToList();
        }
    };
}
