export class PositionClass {
    constructor(number, nomenclature, quantity, price, summ, NDS, total, id) {
        this.number = +number;
        this.nomenclature = nomenclature || "";
        this.quantity = quantity || 0;
        this.price = price || 0;
        this.NDSprcnt = 20 / 100;
        this.highlight = false;
        this.summ = summ || 0;
        this.NDS = NDS || 0;
        this.total = total || 0;
        this.id = id || null;
    }
    getSumm() {
        this.summ = this.quantity * this.price;
        return this.summ;
    }

    getNDS() {
        this.NDS = this.summ * this.NDSprcnt;
        return this.NDS;
    }

    getTotal() {
        this.total = this.summ + this.NDS;
        return this.total;
    }
}

export const sailsArr = [];
export const purchaseArr = [];
export const wbItems = [];
