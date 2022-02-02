export const incomesOnlyIE = {
    // доход от организаций (Д)
    income: 0,
    // вычет страховых взносов (2.2)
    recoupmentValue: 0,
    // зарплата (ФОТ)
    salary: 0,
    // фИкс ОМС (1.2)
    medicalFixInsurance: 8426,
    // фикс ОПС (1.3)
    retirementFixInsurance: 32448,
    // 1% от дохода > 300 тыс. (1.4)
    get retirementFloatInsurance() {
        if (this.income > 300000) {
            return Math.round(((this.income - 300000) * 1) / 100);
        } else {
            return 0;
        }
    },
    // налоги с зарплаты 1.1
    get salaryTax() {
        return Math.round((this.salary * 30.2) / 100);
    },
    // Итого взносы ИП за себя
    get insurance() {
        return Math.round(
            this.retirementFixInsurance +
                this.medicalFixInsurance +
                this.retirementFloatInsurance
        );
    },
    // Итого расходов
    get totalCost() {
        return this.insurance + this.salaryTax;
    },
    // УСН к уплате 2
    get USN() {
        if (this.salary > 0) {
            let usn = Math.round((this.income * 6) / 100);
            if (usn - this.totalCost > usn / 2) {
                this.recoupmentValue = this.totalCost;
                return Math.round(usn - this.totalCost);
            } else {
                this.recoupmentValue = usn / 2;
                return Math.round(usn / 2);
            }
        } else {
            this.recoupmentValue = this.totalCost;
            let check =
                (this.income * 6) / 100 -
                this.retirementFixInsurance -
                this.medicalFixInsurance -
                this.retirementFloatInsurance;
            return Math.round(check > 0 ? check : 0);
        }
    },
    // УСН начислен 2.1
    get usnAccrued() {
        return Math.round((this.income * 6) / 100);
    },
    // Итого налоги
    get totalTax() {
        return Math.round(this.insurance + this.USN + this.salaryTax);
    },
    // Налоговая нагрузка
    get burden() {
        return Math.round((this.totalTax / this.income) * 100);
    },
};

export const incomesOnlyLLC = {
    // доход от организаций (Д)
    income: 0,
    // вычет страховых взносов (2.2)
    recoupmentValue: 0,
    // зарплата (ФОТ)
    salary: 0,

    // налоги с зарплаты 1.1
    get salaryTax() {
        return Math.round((this.salary * 30.2) / 100);
    },

    // УСН к уплате 2
    get USN() {
        if (this.salary > 0) {
            let usn = Math.round((this.income * 6) / 100);
            if (usn - this.salaryTax > (usn * 50) / 100) {
                this.recoupmentValue = this.salaryTax;
                return Math.round(usn - this.salaryTax);
            } else {
                this.recoupmentValue = usn / 2;
                return Math.round((usn * 50) / 100);
            }
        } else {
            this.recoupmentValue = this.salaryTax;
            let check = (this.income * 6) / 100;

            return Math.round(check > 0 ? check : 0);
        }
    },
    // УСН начислен 2.1
    get usnAccrued() {
        return Math.round((this.income * 6) / 100);
    },
    // Итого налоги
    get totalTax() {
        return Math.round(this.USN + this.salaryTax);
    },
    // Налоговая нагрузка
    get burden() {
        return Math.round((this.totalTax / this.income) * 100);
    },
};
