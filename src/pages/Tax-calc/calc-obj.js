class TaxCalculator {
    constructor(income = 0, salary = 0, salaryTaxRate = 30.2) {
        this.income = income;
        this.salary = salary;
        this.salaryTaxRate = salaryTaxRate;
    }
    /**
     * @param {number} value
     */
    set income(value) {
        if (typeof value !== "number")
            throw new Error("income value must be a number");
        this._income = value;
    }

    get income() {
        return this._income;
    }
    /**
     * @param {number} value
     */
    set salary(value) {
        if (typeof value !== "number")
            throw new Error("salary value must be a number");
        this._salary = value;
    }

    get salary() {
        return this._salary;
    }
    /**
     * @param {number} value
     */
    set salaryTaxRate(value) {
        if (typeof value !== "number")
            throw new Error("salaryTaxRate value must be a number");
        this._salaryTaxRate = value;
    }

    get salaryTaxRate() {
        return this._salaryTaxRate;
    }

    _medicalFixInsurance = 8766;

    get medicalFixInsurance() {
        return this._medicalFixInsurance;
    }
    _retirementFixInsurance = 34445;

    get retirementFixInsurance() {
        return this._retirementFixInsurance;
    }

    static floatInsurance({ income }) {
        if (income > 300000) {
            return Math.round(((income - 300000) * 1) / 100);
        } else {
            return 0;
        }
    }

    static totalInsurance({
        income,
        retirementFixInsurance,
        medicalFixInsurance,
    }) {
        const floatInsurance = this.floatInsurance({ income });
        return Math.round(
            retirementFixInsurance + medicalFixInsurance + floatInsurance
        );
    }

    static salaryTax({ salary, salaryTaxRate }) {
        return Math.round((salary * salaryTaxRate) / 100);
    }

    static totalCost({
        income,
        retirementFixInsurance,
        medicalFixInsurance,
        salary,
        salaryTaxRate,
    }) {
        const salaryTax = this.salaryTax({ salary, salaryTaxRate });
        const totalInsurance = this.totalInsurance({
            income,
            retirementFixInsurance,
            medicalFixInsurance,
        });
        return totalInsurance + salaryTax;
    }
    // УСН начислен
    static usnAccrued({ income }) {
        return Math.round((income * 6) / 100);
    }

    static USN({
        income,
        retirementFixInsurance,
        medicalFixInsurance,
        salary,
        salaryTaxRate,
    }) {
        let recoupmentValue = 0;
        const totalCost = this.totalCost({
                income,
                retirementFixInsurance,
                medicalFixInsurance,
                salary,
                salaryTaxRate,
            }),
            floatInsurance = this.floatInsurance({
                income,
                retirementFixInsurance,
                medicalFixInsurance,
            });
        if (salary > 0) {
            const usn = this.usnAccrued({ income });
            if (usn - totalCost > usn / 2) {
                recoupmentValue = totalCost;
                return Math.round(usn - totalCost);
            } else {
                recoupmentValue = usn / 2;
                return Math.round(usn / 2);
            }
        } else {
            recoupmentValue = totalCost;
            let check =
                (income * 6) / 100 -
                retirementFixInsurance -
                medicalFixInsurance -
                floatInsurance;
            return Math.round(check > 0 ? check : 0);
        }
    }
    // Итого налоги
    static totalTax({
        income,
        retirementFixInsurance,
        medicalFixInsurance,
        salary,
        salaryTaxRate,
    }) {
        const totalInsurance = this.totalInsurance({
            income,
            retirementFixInsurance,
            medicalFixInsurance,
        });
        const USN = this.USN({
            income,
            retirementFixInsurance,
            medicalFixInsurance,
            salary,
            salaryTaxRate,
        });
        const salaryTax = this.salaryTax({ salary, salaryTaxRate });
        return Math.round(totalInsurance + USN + salaryTax);
    }
    // Налоговая нагрузка
    static burden({
        income,
        retirementFixInsurance,
        medicalFixInsurance,
        salary,
        salaryTaxRate,
    }) {
        const totalTax = this.totalTax({
            income,
            retirementFixInsurance,
            medicalFixInsurance,
            salary,
            salaryTaxRate,
        });
        return Math.round((totalTax / income) * 100);
    }
}

export const incomesOnlyIE = {
    // доход от организаций (Д)
    income: 0,
    // вычет страховых взносов (2.2)
    recoupmentValue: 0,
    // зарплата (ФОТ)
    salary: 0,
    // фИкс ОМС (1.2)
    _medicalFixInsurance: 8766,
    // фикс ОПС (1.3)
    _retirementFixInsurance: 34445,
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
            this._retirementFixInsurance +
                this._medicalFixInsurance +
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
