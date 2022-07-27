import { IInvoiceItem } from "./invoice";
import { ICounterparty } from "./counterparty";
import { IOrg } from "./organization";

export interface IInvoiceToSend {
    OrgId: number | null | undefined;
    counterpartyId?: number | null | undefined;
    counterparty?: ICounterparty | undefined;
    org: IOrg | null;
    id?: number | null | undefined;
    waybill_date?: string | null | undefined;
    positions?: IInvoiceItem[];
    summ?: number | undefined;
    nds?: number | undefined;
    total?: number;
}
