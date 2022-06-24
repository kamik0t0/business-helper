import axios from "axios";
import { useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getData } from "../../../../utils/getData.ts";
import { setErrorTrueAction } from "../../../../redux/error-reducer.js";
import { setAuthAction } from "../../../../redux/auth-reducer.js";
import { makeDate, total } from "../../common/scripts";

export function useUpdateWaybill(positions, WAYBILL) {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { orgId, id } = useParams();
    const type = pathname === `/sales/${orgId}/${id}` ? "SALES" : "PURCHASES";

    const MYORG = useSelector((state) => state.setMyOrgReducer.myOrg);
    const COUNTERPARTY = useSelector(
        (state) => state.setCounterpartyReducer.counterparty
    );

    const OrgId = localStorage.getItem("OrgsId");

    const UpdateWaybill = useRef({
        waybill_date: WAYBILL.waybill_date,
        counterparty: COUNTERPARTY,
        counterpartyId: COUNTERPARTY.CounterpartyId || COUNTERPARTY.id,
        MYORG,
        OrgId,
    });

    function update(event) {
        return async function (dispatch) {
            event.preventDefault();
            UpdateWaybill.current["positions"] = positions;
            try {
                await axios.patch(
                    process.env.REACT_APP_URL_BASE + pathname,
                    UpdateWaybill.current,
                    {
                        params: {
                            table: type.toLocaleLowerCase(),
                            id: WAYBILL.id,
                        },
                    }
                );
                const getWaybillURL =
                    type === "SALES"
                        ? process.env.REACT_APP_URL_SALES
                        : process.env.REACT_APP_URL_PURCHASES;

                const WAYBILLS = await getData(getWaybillURL, { OrgId }, () =>
                    dispatch(setAuthAction(true))
                );

                dispatch({ type: type, payload: WAYBILLS });
                navigate(-1);
            } catch (error) {
                console.log(error);
                dispatch(setErrorTrueAction(true, error.message));
                navigate(-1);
            }
        };
    }
    const setTotal = (array, field) => total(array, field, UpdateWaybill);

    const getDate = (event) => {
        UpdateWaybill.current.waybill_date = `${
            event.target.value
        }${makeDate()}`;
    };

    const getCounterparty = (event) =>
        (UpdateWaybill.current.counterparty = event.target.value);

    const defaultDate = UpdateWaybill.current.waybill_date.slice(0, -14);

    return [
        UpdateWaybill,
        defaultDate,
        update,
        setTotal,
        getDate,
        getCounterparty,
    ];
}
