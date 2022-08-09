import { IInvoicePosition } from "./invoice";
import { ICounterparty } from "./counterparty";
import { IOrg } from "./organization";

export interface IInvoiceToSend {
    OrgId: number | null | undefined;
    org: IOrg | null;
    waybill_date: string;
    positions: IInvoicePosition[];
    summ: number;
    nds: number;
    total: number;
    counterparty: ICounterparty | null;
}

export class InvoiceToSend implements IInvoiceToSend {
    OrgId: number | null | undefined;
    org: IOrg | null;
    waybill_date: string;
    counterparty: ICounterparty | null;
    positions: IInvoicePosition[];
    summ: number;
    nds: number;
    total: number;

    constructor(
        OrgId: number | undefined,
        org: IOrg | null,
        waybill_date: string,
        counterparty: ICounterparty | null
    ) {
        this.OrgId = OrgId;
        this.org = org;
        this.waybill_date = waybill_date;
        this.counterparty = counterparty;
        this.positions = [];
        this.summ = 0;
        this.nds = 0;
        this.total = 0;
    }
}
