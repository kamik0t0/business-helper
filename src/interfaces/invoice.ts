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

export interface IInvoiceItem {
    id: number | null;
    createdAt?: string | null;
    item_number: number;
    nomenclature: string;
    quantity: number;
    price: number;
    summ: number;
    nds_percent: number;
    nds: number;
    total: number;
    highlight?: boolean;
}

export interface ISaleItem extends IInvoiceItem {
    SaleId?: number | null;
}
export interface IPurchaseItem extends IInvoiceItem {
    PurchaseId?: number | null;
}
export interface IInvoiceState {
    purchases: IInvoice[];
    sales: IInvoice[];
    Invoice: IInvoice | null;
    InvoiceItem: ISaleItem[] | IPurchaseItem[] | null;
    InvoicePositionIndex: number | null;
    isLoading: boolean;
    error: string | null;
}
