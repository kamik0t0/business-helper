import { useRef, useCallback } from "react";
import { useNavigate } from "react-router";
import { useTypedDispatch, useTypedSelector } from "../../../redux/hooks/hooks";
import {
    calculateInvoiceSummary,
    getDate,
    getCounterpartyName,
    makeDefaultDate,
} from "../../../components/waybills-service/common/scripts";

export function useCreateInvoice(positions, counterparty, createAction) {
    const dispatch = useTypedDispatch();
    const navigate = useNavigate();

    const { org } = useTypedSelector((state) => state.orgsReducer);

    const INVOICE = useRef({
        waybill_date: makeDefaultDate(),
        myOrg: org,
        counterparty: counterparty && counterparty,
        OrgId: org.id,
    });

    INVOICE.current["positions"] = positions;
    INVOICE.current["summ"] = calculateInvoiceSummary(positions, "summ");
    INVOICE.current["nds"] = calculateInvoiceSummary(positions, "nds");
    INVOICE.current["total"] = calculateInvoiceSummary(positions, "total");

    const create = useCallback(
        async (event) => {
            event.preventDefault();
            await dispatch(createAction(INVOICE.current));
            navigate(-1);
        },
        [dispatch, navigate, createAction]
    );

    const setDate = useCallback((event) => {
        INVOICE.current.waybill_date = getDate(event);
    }, []);

    const setCounterpartyName = useCallback((event) => {
        INVOICE.current.counterparty.orgname = getCounterpartyName(event);
    }, []);

    return {
        INVOICE,
        create,
        defaultDate: INVOICE.current.waybill_date.slice(0, -14),
        setDate,
        setCounterpartyName,
        summ: INVOICE.current["summ"],
        NDS: INVOICE.current["nds"],
        total: INVOICE.current["total"],
    };
}
