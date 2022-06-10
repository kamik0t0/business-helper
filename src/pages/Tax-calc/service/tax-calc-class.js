import { TaxCalculator } from "./calc-constructor.js";

export class TaxCalculatorIE extends TaxCalculator {
    constructor(income, salary, salaryTaxRate) {
        super(income, salary, salaryTaxRate);
    }
    // Фикс. ОМС
    _medicalFixInsurance = 8766;

    get medicalFixInsurance() {
        return this._medicalFixInsurance;
    }
    // Фикс. ОПС
    _retirementFixInsurance = 34445;

    get retirementFixInsurance() {
        return this._retirementFixInsurance;
    }
    // Страховые взносы 1% с доходов > 300 тыс. руб.
    static floatInsurance({ income }) {
        if (income > 300000) {
            return Math.round(((income - 300000) * 1) / 100);
        } else {
            return 0;
        }
    }
    // Страховые взносы ИП
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
    // Налоги с зарплаты
    static salaryTax({ salary, salaryTaxRate }) {
        return Math.round((salary * salaryTaxRate) / 100);
    }
    // Расходы
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
    // УСН
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
