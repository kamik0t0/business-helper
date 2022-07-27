import { IInvoiceItem } from "../interfaces/invoice";

export class InvoiceItem implements IInvoiceItem {
    id: number | null;
    item_number: number;
    nomenclature: string;
    quantity: number;
    price: number;
    summ: number;
    nds_percent: number;
    nds: number;
    total: number;
    highlight?: boolean;
    SaleId?: number | null;
    PurchaseId?: number | null;
    createdAt?: string | null;
    [prop: string]: any;

    constructor(
        highlight?: boolean,
        id?: number | null,
        item_number?: number,
        nomenclature?: string,
        quantity?: number,
        price?: number,
        summ?: number,
        nds?: number,
        total?: number,
        createdAt?: string | null,
        nds_percent?: number | null,
        SaleId?: number | null | undefined,
        PurchaseId?: number | null | undefined
    ) {
        this.id = id || null;
        this.item_number = item_number || 0;
        this.nomenclature = nomenclature || "";
        this.quantity = quantity || 0;
        this.price = price || 0;
        this.nds_percent = nds_percent || 20 / 100;
        this.nds = nds || 0;
        this.summ = summ || 0;
        this.total = total || 0;
        this.highlight = highlight || false;
        this.createdAt = createdAt || null;
        this.SaleId = SaleId || null;
        this.PurchaseId = PurchaseId || null;
    }

    getSumm(): number {
        this.summ = this.quantity * this.price;
        return this.summ;
    }
    getNDS(): number {
        this.nds = this.summ * this.nds_percent;
        return this.nds;
    }

    getTotal(): number {
        this.total = this.summ + this.nds;
        return this.total;
    }
}
