export interface ISale {
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
}

export interface ISaleItems {
    id: number;
    createdAt: string;
    saleId: number;
    item_number: number;
    nomenclature: string;
    quantity: number;
    price: number;
    summ: number;
    nds_percent: number;
    nds: number;
    total: number;
}

export interface ISalesState {
    sales: ISale[];
    sale: ISale | null;
    saleItems: ISaleItems[] | null;
    loading: boolean;
    error: string | null;
}
