import axios from "axios";
import { getData } from "../../../../utils/getData.ts";
import { setErrorTrueAction } from "../../../../redux/error-reducer.js";
import { setAuth } from "../../../../redux/reducers/authSlice";

// создание накладной
export function create(event, WAYBILL, positions, setNavToList, type) {
    return async function (dispatch) {
        event.preventDefault();
        const { pathname } = window.location;
        WAYBILL.current["positions"] = positions;
        const OrgId = localStorage.getItem("OrgsId");
        WAYBILL.current["OrgId"] = OrgId;
        try {
            await axios.post(
                process.env.REACT_APP_URL_BASE + pathname,
                WAYBILL.current,
                {
                    params: {
                        table: pathname.slice(1),
                        OrgId: OrgId,
                        CounterpartyId: localStorage.getItem("counterpartyId"),
                    },
                }
            );

            const WAYBILLS = await getData(
                process.env.REACT_APP_URL_BASE + pathname,
                { OrgId },
                () => dispatch(setAuth(true))
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
