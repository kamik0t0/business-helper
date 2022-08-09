import { IInvoicePosition } from "../interfaces/invoice";

export class InvoicePositionConstructor implements IInvoicePosition {
    id: number | null;
    item_number: number | null;
    nomenclature: string;
    quantity: number;
    price: number;
    summ: number;
    nds_percent: number;
    nds: number;
    total: number;
    createdAt?: string | undefined;
    highlight?: boolean | undefined;
    SaleId?: number | null | undefined;
    PurchaseId?: number | null | undefined;
    [prop: string]: any;

    constructor(
        id: number | null,
        item_number: number | null,
        nomenclature: string,
        quantity: number,
        price: number,
        summ: number,
        nds_percent: number,
        nds: number,
        total: number,
        highlight?: boolean,
        createdAt?: string | undefined,
        SaleId?: number | null | undefined,
        PurchaseId?: number | null | undefined
    ) {
        this.id = id || null;
        this.item_number = item_number || 0;
        this.nomenclature = nomenclature || "";
        this.quantity = quantity || 0;
        this.price = price || 0;
        this.summ = summ || 0;
        this.nds_percent = nds_percent || 20 / 100;
        this.nds = nds || 0;
        this.total = total || 0;
        this.createdAt = createdAt || null || undefined;
        this.highlight = highlight || false;
        this.SaleId = SaleId || null;
        this.PurchaseId = PurchaseId || null;
    }
}
