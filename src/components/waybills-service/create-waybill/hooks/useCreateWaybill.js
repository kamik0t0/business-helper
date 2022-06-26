import axios from "axios";
import { useRef, useState } from "react";
import { useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { getData } from "../../../../utils/getData.ts";
import { setErrorTrueAction } from "../../../../redux/error-reducer.js";
import { setAuthAction } from "../../../../redux/auth-reducer.js";
import { makeDefaultDate, total, makeDate } from "../../common/scripts";
import { useParams } from "react-router-dom";

export function useCreateWaybill(positions) {
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { orgId } = useParams();
    const OrgId = localStorage.getItem("OrgsId");

    const [table, URL] =
        pathname === `/sales/${orgId}/createwaybill`
            ? ["SALES", process.env.REACT_APP_URL_SALES]
            : ["PURCHASES", process.env.REACT_APP_URL_PURCHASES];

    const MYORG = useSelector((state) => state.setMyOrgReducer.myOrg);
    const COUNTERPARTY = useSelector(
        (state) => state.setCounterpartyReducer.counterparty
    );
    const WAYBILL = useRef({
        date: makeDefaultDate(),
        myOrg: MYORG,
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
                    dispatch(setAuthAction(true))
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
