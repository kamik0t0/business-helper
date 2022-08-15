import { makeDefaultDate } from "../components/waybills-service/common/scripts";
import { ICounterparty } from "../interfaces/counterparty";
import { IInvoice, InvoiceConstructor } from "../interfaces/invoice";
import { IOrg } from "../interfaces/organization";

export const createInvoiceObject = (
    org: IOrg,
    cl: ICounterparty | null
): IInvoice =>
    new InvoiceConstructor(
        null,
        cl?.id || null,
        org?.id || null,
        org?.orgname || null,
        makeDefaultDate(),
        org?.inn || null,
        org?.kpp || null,
        org?.address || null,
        org?.opf || null,
        cl?.orgname || null,
        cl?.inn || null,
        cl?.kpp || null,
        cl?.opf || null,
        cl?.address || null,
        [],
        0,
        0,
        0,
        ""
    );
