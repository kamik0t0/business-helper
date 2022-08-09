import { useCallback } from "react";
import { useNavigate } from "react-router";
import { getDate } from "../../../components/waybills-service/common/scripts";
import { IEvent } from "../../../interfaces/event";
import { IInvoice } from "../../../interfaces/invoice";
import { useTypedDispatch, useTypedSelector } from "../../../redux/hooks/hooks";
import { setInvoice } from "../../../redux/reducers/InvoiceSlice";

export function useCreateInvoice(action: (object: IInvoice) => any) {
    const dispatch = useTypedDispatch();
    const navigate = useNavigate();
    const { counterparty: cl } = useTypedSelector(
        (state) => state.counterpartyReducer
    );
    const { Invoice, InvoicePosition } = useTypedSelector(
        (state) => state.invoicesReducer
    );

    const create = async (event: IEvent) => {
        event.preventDefault();

        if (Invoice !== null) {
            const InvoiceToSend = Object.assign({}, Invoice, {
                counterpartyId: cl?.id,
                cl_orgname: cl?.orgname,
                cl_inn: cl?.inn,
                cl_kpp: cl?.kpp,
                cl_opf: cl?.opf,
                cl_address: cl?.address,
                positions: InvoicePosition,
            });

            await dispatch(action(InvoiceToSend));
            dispatch(setInvoice(null));
            navigate(-1);
        }
    };

    const setDate = useCallback(
        (event: IEvent) =>
            dispatch(
                setInvoice(
                    Object.assign({}, Invoice, {
                        waybill_date: getDate(event),
                    })
                )
            ),
        [Invoice, dispatch]
    );

    const counterpartyName = () => {
        if (!cl?.orgname) return Invoice?.cl_orgname;
        if (cl.orgname) return cl.orgname;
    };

    return {
        create,
        setDate,
        counterpartyName: counterpartyName(),
    };
}
