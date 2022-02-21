export class Positions {
    constructor(number) {
        this.number = +number;
        this.nomenclature = "";
        this.quantity = 0;
        this.price = 0;
        this.NDSprcnt = 20 / 100;
        this.highlight = false;
        this.summ = 0;
        this.NDS = 0;
        this.total = 0;
    }
    // синтаксис свойств-аксессоров используется поскольку не поулчилось передать через fetch
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
