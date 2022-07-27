import { MutableRefObject, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
    calculateInvoiceSummary,
    getCounterpartyName,
    getDate,
} from "../../../components/waybills-service/common/scripts";
import { ICounterparty } from "../../../interfaces/counterparty";
import { IEvent } from "../../../interfaces/event";
import { IInvoice, IInvoiceItem } from "../../../interfaces/invoice";
import { IInvoiceToSend } from "../../../interfaces/InvoiceToSend";
import { useTypedDispatch, useTypedSelector } from "../../../redux/hooks/hooks";

export function useUpdateInvoice(
    positions: IInvoiceItem[],
    counterparty: ICounterparty,
    invoice: IInvoice,
    updateAction: (object: IInvoiceToSend) => any
) {
    const dispatch = useTypedDispatch();
    const navigate = useNavigate();

    const { org } = useTypedSelector((state) => state.orgsReducer);
    const { counterparties } = useTypedSelector(
        (state) => state.counterpartyReducer
    );

    const defaultCounterparty = counterparties.find(
        (counterparty) => counterparty.id === invoice?.counterpatyId
    );

    const UpdateInvoice: MutableRefObject<IInvoiceToSend> = useRef({
        id: invoice?.id,
        waybill_date: invoice?.waybill_date,
        OrgId: org?.id,
        counterpartyId:
            (counterparty !== null && counterparty.id) ||
            (defaultCounterparty && defaultCounterparty.id),
        counterparty:
            (counterparty != null && counterparty) ||
            (defaultCounterparty && defaultCounterparty),
        org,
    });

    UpdateInvoice.current.positions = positions;
    UpdateInvoice.current.summ = calculateInvoiceSummary(positions, "summ");
    UpdateInvoice.current.nds = calculateInvoiceSummary(positions, "nds");
    UpdateInvoice.current.total = calculateInvoiceSummary(positions, "total");

    const update = useCallback(
        async (event: IEvent) => {
            event.preventDefault();
            await dispatch(updateAction(UpdateInvoice.current));
            navigate(-1);
        },
        [dispatch, navigate, updateAction]
    );

    const setDate = useCallback((event: IEvent) => {
        UpdateInvoice.current.waybill_date = getDate(event);
    }, []);

    const setCounterpartyName = useCallback((event: IEvent) => {
        if (UpdateInvoice.current.counterparty !== undefined) {
            UpdateInvoice.current.counterparty.orgname =
                getCounterpartyName(event);
        }
    }, []);

    const defaultDate =
        UpdateInvoice.current.waybill_date != undefined &&
        UpdateInvoice.current.waybill_date.slice(0, -14);

    return {
        UpdateInvoice,
        update,
        defaultDate,
        setDate,
        setCounterpartyName,
        summ: UpdateInvoice.current.summ,
        NDS: UpdateInvoice.current.nds,
        total: UpdateInvoice.current.total,
    };
}
