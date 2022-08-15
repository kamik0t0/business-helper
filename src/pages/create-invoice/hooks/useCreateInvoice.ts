import React, { useCallback } from "react";
import { useNavigate } from "react-router";
import { getDate } from "../../../components/waybills-service/common/scripts";
import { IInvoice } from "../../../interfaces/invoice";
import { useTypedDispatch, useTypedSelector } from "../../../redux/hooks/hooks";
import { setInvoice } from "../../../redux/reducers/InvoiceSlice";

export function useCreateInvoice(action: any) {
    const dispatch = useTypedDispatch();
    const navigate = useNavigate();
    const { counterparty: cl } = useTypedSelector(
        (state) => state.counterpartyReducer
    );
    const { Invoice, InvoicePosition } = useTypedSelector(
        (state) => state.invoicesReducer
    );

    const create = async (event: React.ChangeEvent) => {
        event.preventDefault();

        if (Invoice !== null) {
            const InvoiceToSend: IInvoice = Object.assign(
                {},
                Invoice,
                {
                    positions: InvoicePosition,
                },
                cl !== null && {
                    counterpartyId: cl?.id,
                    cl_orgname: cl?.orgname,
                    cl_inn: cl?.inn,
                    cl_kpp: cl?.kpp,
                    cl_opf: cl?.opf,
                    cl_address: cl?.address,
                }
            );

            await dispatch(action(InvoiceToSend));
            dispatch(setInvoice(null));
            navigate(-1);
        }
    };

    const setDate = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) =>
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
        else return cl.orgname;
    };

    return {
        create,
        setDate,
        counterpartyName: counterpartyName(),
    };
}
