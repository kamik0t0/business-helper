import { makeDefaultDate } from "../../../components/waybills-service/common/scripts";
import { ICounterparty } from "../../../interfaces/counterparty";
import { InvoiceConstructor } from "../../../interfaces/invoice";
import { IOrg } from "../../../interfaces/organization";

export const createInvoiceObj = (org: IOrg, cl: ICounterparty | null) =>
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
