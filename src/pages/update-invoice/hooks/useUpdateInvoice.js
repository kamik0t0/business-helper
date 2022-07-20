import { useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTypedDispatch, useTypedSelector } from "../../../redux/hooks/hooks";
import {
    calculateInvoiceSummary,
    getDate,
    getCounterpartyName,
} from "../../../components/waybills-service/common/scripts";

export function useUpdateInvoice(
    positions,
    counterparty,
    invoice,
    updateAction
) {
    const dispatch = useTypedDispatch();
    const navigate = useNavigate();

    const { org } = useTypedSelector((state) => state.orgsReducer);
    const { counterparties } = useTypedSelector(
        (state) => state.counterpartyReducer
    );

    const defaultCounterparty = counterparties.find(
        (counterparty) => counterparty.id === invoice?.CounterpartyId
    );

    const UpdateInvoice = useRef({
        waybill_date: invoice?.waybill_date,
        counterparty:
            (counterparty != null && counterparty) ||
            (defaultCounterparty && defaultCounterparty),
        counterpartyId:
            (counterparty !== null && counterparty.id) ||
            (defaultCounterparty && defaultCounterparty.id),
        org,
        OrgId: org.id,
        id: invoice?.id,
    });

    UpdateInvoice.current["positions"] = positions;
    UpdateInvoice.current["summ"] = calculateInvoiceSummary(positions, "summ");
    UpdateInvoice.current["nds"] = calculateInvoiceSummary(positions, "nds");
    UpdateInvoice.current["total"] = calculateInvoiceSummary(
        positions,
        "total"
    );

    const update = useCallback(
        async (event) => {
            event.preventDefault();
            await dispatch(updateAction(UpdateInvoice.current));
            navigate(-1);
        },
        [dispatch, navigate, updateAction]
    );

    const setDate = useCallback((event) => {
        UpdateInvoice.current.waybill_date = getDate(event);
    }, []);

    const setCounterpartyName = useCallback((event) => {
        UpdateInvoice.current.counterparty.orgname = getCounterpartyName(event);
    }, []);

    return {
        UpdateInvoice,
        update,
        defaultDate: UpdateInvoice.current.waybill_date.slice(0, -14),
        setDate,
        setCounterpartyName,
        summ: UpdateInvoice.current["summ"],
        NDS: UpdateInvoice.current["nds"],
        total: UpdateInvoice.current["total"],
    };
}
