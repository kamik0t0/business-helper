import axios from "axios";
import { getData } from "../../../../utils/getData.js";
import { setErrorTrueAction } from "../../../../redux/error-reducer.js";
import { setAuthAction } from "../../../../redux/auth-reducer.js";
import { setWaybillAction } from "../../../../redux/waybill-reducer.js";

export function update(event, path, UpdateWaybill, setNav, id, positions) {
    return async function (dispatch) {
        const type = path === "/sales" ? "SALES" : "PURCHASES";
        event.preventDefault();
        UpdateWaybill.current["positions"] = positions;
        const table = path.slice(1);
        try {
            await axios.patch(
                `http://localhost:5600${path}/`,
                UpdateWaybill.current,
                {
                    params: {
                        table: table,
                        id,
                    },
                }
            );
            const OrgId = localStorage.getItem("OrgsId");
            const WAYBILLS = await getData(
                `http://localhost:5600${path}/?OrgId=${OrgId}`,
                () => dispatch(setAuthAction(true)),
                { OrgId: OrgId }
            );
            setNav();
            dispatch({ type, payload: WAYBILLS });
            dispatch(setWaybillAction({}));
        } catch (error) {
            console.log(error);
            dispatch(setErrorTrueAction(true, error.message));
        }
    };
}
