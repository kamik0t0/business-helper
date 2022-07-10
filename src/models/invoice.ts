export interface IInvoice {
    id: number;
    createdAt: string;
    counterpatyId: number;
    orgname: string;
    inn: string;
    kpp: string;
    bank: string;
    bik: string;
    korr: string;
    acc: string;
    address: string;
    opf: string;
    cl_orgname: string;
    cl_inn: string;
    cl_kpp: string;
    cl_bank: string;
    cl_bik: string;
    cl_korr: string;
    cl_acc: string;
    cl_address: string;
    waybill_date: string;
    nds: number;
    summ: number;
    total: number;
    cl_opf: string;
    OrgId: number;
    cl_waybill_number: string;
    highlight: boolean;
}

interface IInvoiceItems {
    id: number;
    createdAt: string;
    item_number: number;
    nomenclature: string;
    quantity: number;
    price: number;
    summ: number;
    nds_percent: number;
    nds: number;
    total: number;
}

export interface ISaleItems extends IInvoiceItems {
    saleId: number;
}
export interface IPurchaseItems extends IInvoiceItems {
    purchaseId: number;
}
export interface IInvoiceState {
    purchases: IInvoice[];
    sales: IInvoice[];
    Invoice: IInvoice | null;
    InvoiceItems: ISaleItems[] | IPurchaseItems[];
    loading: boolean;
    error: string | null;
}
