export class Position {
    constructor(number) {
        this.number = +number;
        this.nomenclature = "";
        this.quantity = 0;
        this.price = 0;
        this.NDSprcnt = 20 / 100;
        this.highlight = false;
    }

    get summ() {
        return this.quantity * this.price;
    }

    get NDS() {
        return this.summ * this.NDSprcnt;
    }

    get total() {
        return this.summ + this.NDS;
    }
}

export const sailsArr = [];
export const purchaseArr = [];
export const wbItems = [];
