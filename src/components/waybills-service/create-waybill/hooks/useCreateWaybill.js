import axios from "axios";
import { useRef, useState } from "react";
import { useLocation } from "react-router";
import {
    useTypedSelector,
    useTypedDispatch,
} from "../../../../redux/hooks/hooks";
import { useNavigate } from "react-router";
import { getData } from "../../../../utils/getData.ts";
import { setErrorTrueAction } from "../../../../redux/error-reducer.js";
import { setAuth } from "../../../../redux/reducers/authSlice";
import { makeDefaultDate, total, makeDate } from "../../common/scripts";
import { useParams } from "react-router-dom";

export function useCreateWaybill(positions) {
    const [loader, setLoader] = useState(false);
    const dispatch = useTypedDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { orgId } = useParams();
    const OrgId = localStorage.getItem("OrgsId");

    const [table, URL] =
        pathname === `/sales/${orgId}/createwaybill`
            ? ["SALES", process.env.REACT_APP_URL_SALES]
            : ["PURCHASES", process.env.REACT_APP_URL_PURCHASES];

    const USERORG = useTypedSelector((state) => state.orgsReducer.org);
    const COUNTERPARTY = useTypedSelector(
        (state) => state.counterpartyReducer.counterparty
    );
    const WAYBILL = useRef({
        date: makeDefaultDate(),
        myOrg: USERORG,
        counterparty: COUNTERPARTY,
        OrgId,
    });

    WAYBILL.current["positions"] = positions;

    function create(event) {
        event.preventDefault();
        setLoader((loader) => !loader);
        return async function (dispatch) {
            try {
                await axios.post(URL, WAYBILL.current, {
                    params: {
                        table: table.toLowerCase(),
                        OrgId: OrgId,
                        CounterpartyId: localStorage.getItem("counterpartyId"),
                    },
                });

                const WAYBILLS = await getData(URL, { OrgId }, () =>
                    dispatch(setAuth(true))
                );
                dispatch({ type: table, payload: WAYBILLS });
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
