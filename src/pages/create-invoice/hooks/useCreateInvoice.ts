import { MutableRefObject, useCallback, useRef } from "react";
import { useNavigate } from "react-router";
import {
    calculateInvoiceSummary,
    getCounterpartyName,
    getDate,
    makeDefaultDate,
} from "../../../components/waybills-service/common/scripts";
import { ICounterparty } from "../../../interfaces/counterparty";
import { IEvent } from "../../../interfaces/event";
import { IInvoiceItem } from "../../../interfaces/invoice";
import { IInvoiceToSend } from "../../../interfaces/InvoiceToSend";
import { useTypedDispatch, useTypedSelector } from "../../../redux/hooks/hooks";

export function useCreateInvoice(
    positions: IInvoiceItem[],
    counterparty: ICounterparty,
    createAction: (object: IInvoiceToSend) => any
) {
    const dispatch = useTypedDispatch();
    const navigate = useNavigate();

    const { org } = useTypedSelector((state) => state.orgsReducer);

    const CreateInvoice: MutableRefObject<IInvoiceToSend> = useRef({
        waybill_date: makeDefaultDate(),
        org: org,
        counterparty: counterparty && counterparty,
        OrgId: org?.id,
    });

    CreateInvoice.current.positions = positions;
    CreateInvoice.current.summ = calculateInvoiceSummary(positions, "summ");
    CreateInvoice.current.nds = calculateInvoiceSummary(positions, "nds");
    CreateInvoice.current.total = calculateInvoiceSummary(positions, "total");

    const create = useCallback(
        async (event: IEvent) => {
            event.preventDefault();
            console.log(CreateInvoice.current);

            await dispatch(createAction(CreateInvoice.current));
            navigate(-1);
        },
        [dispatch, navigate, createAction]
    );

    const setDate = useCallback((event: IEvent) => {
        CreateInvoice.current.waybill_date = getDate(event);
    }, []);

    const setCounterpartyName = useCallback((event: IEvent) => {
        if (CreateInvoice.current.counterparty !== undefined) {
            CreateInvoice.current.counterparty.orgname =
                getCounterpartyName(event);
        }
    }, []);

    const defaultDate =
        CreateInvoice.current.waybill_date != undefined &&
        CreateInvoice.current.waybill_date.slice(0, -14);

    return {
        CreateInvoice,
        create,
        defaultDate,
        setDate,
        setCounterpartyName,
        summ: CreateInvoice.current.summ,
        NDS: CreateInvoice.current.nds,
        total: CreateInvoice.current.total,
    };
}
