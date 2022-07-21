var InvoiceItem = /** @class */ (function () {
    function InvoiceItem(highlight, id, item_number, nomenclature, quantity, price, summ, nds, total, createdAt, nds_percent, SaleId, PurchaseId) {
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
    InvoiceItem.prototype.getSumm = function () {
        this.summ = this.quantity * this.price;
        return this.summ;
    };
    InvoiceItem.prototype.getNDS = function () {
        this.nds = this.summ * this.nds_percent;
        return this.nds;
    };
    InvoiceItem.prototype.getTotal = function () {
        this.total = this.summ + this.nds;
        return this.total;
    };
    return InvoiceItem;
}());
export { InvoiceItem };
