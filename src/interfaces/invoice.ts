export class InvoiceConstructor implements IInvoice {
    id: number | null;
    counterpartyId: number | null;
    OrgId: number | null;
    orgname: string | null;
    waybill_date: string | null;
    inn: string | null;
    kpp: string | null;
    address: string | null;
    opf: string | null;
    // bank: string;
    // bik: string;
    // korr: string;
    // acc: string;
    cl_orgname: string | null;
    cl_inn: string | null;
    cl_kpp: string | null;
    cl_opf: string | null;
    cl_address: string | null;
    // cl_bank: string;
    // cl_bik: string;
    // cl_korr: string;
    // cl_acc: string;
    positions: IInvoicePosition[];
    summ: number;
    nds: number;
    total: number;
    createdAt: string;
    highlight?: boolean;

    constructor(
        id: number | null,
        counterpartyId: number | null,
        OrgId: number | null,
        orgname: string | null,
        waybill_date: string | null,
        inn: string | null,
        kpp: string | null,
        address: string | null,
        opf: string | null,
        // bank: string,
        // bik: string,
        // korr: string,
        // acc: string,
        cl_orgname: string | null,
        cl_inn: string | null,
        cl_kpp: string | null,
        cl_opf: string | null,
        cl_address: string | null,
        // cl_bank: string,
        // cl_bik: string,
        // cl_korr: string,
        // cl_acc: string,
        positions: IInvoicePosition[],
        summ: number,
        nds: number,
        total: number,
        createdAt: string,
        highlight?: boolean
    ) {
        this.id = id || null;
        this.counterpartyId = counterpartyId;
        this.OrgId = OrgId;
        this.orgname = orgname;
        this.waybill_date = waybill_date;
        this.inn = inn;
        this.kpp = kpp;
        this.address = address;
        this.opf = opf;
        // this.bank = bank;
        // this.bik = bik;
        // this.korr = korr;
        // this.acc = acc;
        this.cl_orgname = cl_orgname;
        this.cl_inn = cl_inn;
        this.cl_kpp = cl_kpp;
        this.cl_opf = cl_opf;
        this.cl_address = cl_address;
        // this.cl_bank = cl_bank;
        // this.cl_bik = cl_bik;
        // this.cl_korr = cl_korr;
        // this.cl_acc = cl_acc
        this.positions = positions;
        this.summ = summ || 0;
        this.nds = nds || 0;
        this.total = total || 0;
        this.createdAt = createdAt;
    }
}

export interface IInvoice {
    id: number | null;
    counterpartyId: number | null;
    OrgId: number | null;
    orgname: string | null;
    waybill_date: string | null;
    inn: string | null;
    kpp: string | null;
    address: string | null;
    opf: string | null;
    // bank: string;
    // bik: string;
    // korr: string;
    // acc: string;
    cl_orgname: string | null;
    cl_inn: string | null;
    cl_kpp: string | null;
    cl_opf: string | null;
    cl_address: string | null;
    // cl_bank: string;
    // cl_bik: string;
    // cl_korr: string;
    // cl_acc: string;
    positions: IInvoicePosition[];
    nds: number;
    summ: number;
    total: number;
    createdAt: string;
    highlight?: boolean;
    [prop: string | number]: any;
}

export interface IInvoicePosition {
    id: number | null;
    item_number: number | null;
    nomenclature: string;
    quantity: number;
    price: number;
    summ: number;
    nds_percent: number;
    nds: number;
    total: number;
    createdAt?: string;
    highlight?: boolean | undefined;
    SaleId?: number | null;
    PurchaseId?: number | null | undefined;
    [prop: string]: string | number | undefined | null | boolean;
}

export interface IInvoiceState {
    purchases: IInvoice[];
    sales: IInvoice[];
    Invoice: IInvoice | null;
    InvoicePosition: IInvoicePosition[] | null;
    InvoicePositionIndex: number | null;
    isLoading: boolean;
    error: string | null;
}
