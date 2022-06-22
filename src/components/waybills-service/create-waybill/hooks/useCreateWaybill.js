import axios from "axios";
import { useRef, useState } from "react";
import { useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { getData } from "../../../../utils/getData.ts";
import { setErrorTrueAction } from "../../../../redux/error-reducer.js";
import { setAuthAction } from "../../../../redux/auth-reducer.js";
import { makeDefaultDate, total, makeDate } from "../../common/scripts";

export function useCreateWaybill(positions) {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const type = pathname === "/sales/createwaybill" ? "SALES" : "PURCHASES";
    const MYORG = useSelector((state) => state.setMyOrgReducer.myOrg);
    const COUNTERPARTY = useSelector(
        (state) => state.setCounterpartyReducer.counterparty
    );
    const WAYBILL = useRef({ date: makeDefaultDate() });
    WAYBILL.current["myOrg"] = MYORG;
    WAYBILL.current["counterparty"] = COUNTERPARTY;
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();

    function create(event) {
        return async function (dispatch) {
            event.preventDefault();
            setLoader((loader) => !loader);
            const { pathname } = window.location;
            WAYBILL.current["positions"] = positions;
            const OrgId = localStorage.getItem("OrgsId");
            WAYBILL.current["OrgId"] = OrgId;

            try {
                await axios.post(
                    process.env.REACT_APP_URL_BASE + pathname.slice(0, -14),
                    WAYBILL.current,
                    {
                        params: {
                            table: pathname.slice(1),
                            OrgId: OrgId,
                            CounterpartyId:
                                localStorage.getItem("counterpartyId"),
                        },
                    }
                );

                const WAYBILLS = await getData(
                    process.env.REACT_APP_URL_BASE + pathname.slice(0, -14),
                    { OrgId },
                    () => dispatch(setAuthAction(true))
                );
                dispatch({ type: type, payload: WAYBILLS });
                setLoader((loader) => !loader);
                navigate(-1);
            } catch (error) {
                console.log(error);
                dispatch(setErrorTrueAction(true, error.message));
                navigate(-1);
            }
        };
    }
    const setTotal = (array, field) => total(array, field, WAYBILL);

    const getDate = (event) => {
        WAYBILL.current.date = `${event.target.value}${makeDate()}`;
    };

    const getCounterparty = (event) =>
        (WAYBILL.current.counterparty = event.target.value);

    const defaultDate = WAYBILL.current.date.slice(0, -14);
    const dispatchCreateWaybill = (event) => dispatch(create(event));

    return [
        loader,
        WAYBILL,
        defaultDate,
        dispatchCreateWaybill,
        setTotal,
        getDate,
        getCounterparty,
    ];
}
