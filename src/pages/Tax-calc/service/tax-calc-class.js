import { TaxCalculator } from "./calc-constructor.js";

export class TaxCalculatorIE extends TaxCalculator {
    constructor(salaryTaxRate, medicalFixInsurance, retirementFixInsurance) {
        super(salaryTaxRate);
        this.medicalFixInsurance = medicalFixInsurance;
        this.retirementFixInsurance = retirementFixInsurance;
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
        salary,
        retirementFixInsurance,
        medicalFixInsurance,
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
        salary,
        salaryTaxRate,
        retirementFixInsurance,
        medicalFixInsurance,
    }) {
        // let recoupmentValue = 0;
        const totalCost = this.totalCost({
                income,
                salary,
                retirementFixInsurance,
                medicalFixInsurance,
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
                // recoupmentValue = totalCost;
                return Math.round(usn - totalCost);
            } else {
                // recoupmentValue = usn / 2;
                return Math.round(usn / 2);
            }
        } else {
            // recoupmentValue = totalCost;
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
        salary,
        retirementFixInsurance,
        medicalFixInsurance,
        salaryTaxRate,
    }) {
        if (income === 0 && salary === 0) {
            return 0;
        }
        const totalInsurance = this.totalInsurance({
            income,
            retirementFixInsurance,
            medicalFixInsurance,
        });
        const USN =
            income === 0
                ? 0
                : this.USN({
                      income,
                      salary,
                      salaryTaxRate,
                      retirementFixInsurance,
                      medicalFixInsurance,
                  });
        const salaryTax =
            salary === 0 ? 0 : this.salaryTax({ salary, salaryTaxRate });
        return Math.round(totalInsurance + USN + salaryTax);
    }
    // Налоговая нагрузка
    static burden({
        income,
        salary,
        salaryTaxRate,
        retirementFixInsurance,
        medicalFixInsurance,
    }) {
        if (income === 0 && salary === 0) {
            return 0;
        }
        const totalInsurance =
            income === 0
                ? retirementFixInsurance + medicalFixInsurance
                : this.totalInsurance({
                      income,
                      retirementFixInsurance,
                      medicalFixInsurance,
                  });
        const USN =
            income === 0
                ? 0
                : this.USN({
                      salary,
                      income,
                      salaryTaxRate,
                      retirementFixInsurance,
                      medicalFixInsurance,
                  });
        const salaryTax =
            salary === 0 ? 0 : this.salaryTax({ salary, salaryTaxRate });
        if (income > 0) {
            return Math.round(
                ((salaryTax + USN + totalInsurance) / income) * 100
            );
        }
        if (income <= 0 && salary > 0) {
            return Math.round(((salaryTax + totalInsurance) / salary) * 100);
        }
    }
}

export class TaxCalculatorLLC extends TaxCalculator {
    constructor(salaryTaxRate) {
        super(salaryTaxRate);
    }

    // налоги с зарплаты 1.1
    static salaryTax({ salary, salaryTaxRate }) {
        return Math.round((salary * salaryTaxRate) / 100);
    }
    // УСН начислен 2.1
    static usnAccrued({ income }) {
        return Math.round((income * 6) / 100);
    }
    // Итого налоги
    static totalTax({ salary, income, salaryTaxRate }) {
        if (income === 0 && salary === 0) return 0;

        const USN =
            income === 0 ? 0 : this.USN({ salary, income, salaryTaxRate });
        const salaryTax =
            salary === 0 ? 0 : this.salaryTax({ salary, salaryTaxRate });
        return Math.round(USN + salaryTax);
    }
    // Налоговая нагрузка
    static burden({ income, salary, salaryTaxRate }) {
        if (income === 0 && salary === 0) return 0;
        const USN =
            income === 0 ? 0 : this.USN({ salary, income, salaryTaxRate });
        const salaryTax =
            salary === 0 ? 0 : this.salaryTax({ salary, salaryTaxRate });
        if (income > 0) {
            return Math.round(((salaryTax + USN) / income) * 100);
        }
        if (income <= 0 && salary > 0) {
            return Math.round((salaryTax / salary) * 100);
        }
    }
    // УСН к уплате 2
    static USN({ salary, income, salaryTaxRate }) {
        const salaryTax = this.salaryTax({ salary, salaryTaxRate });
        let recoupmentValue = 0;
        if (salary > 0) {
            let usn = Math.round((income * 6) / 100);
            if (usn - salaryTax > (usn * 50) / 100) {
                recoupmentValue = salaryTax;
                return Math.round(usn - salaryTax);
            } else {
                recoupmentValue = usn / 2;
                return Math.round((usn * 50) / 100);
            }
        } else {
            recoupmentValue = salaryTax;
            let check = (income * 6) / 100;

            return Math.round(check > 0 ? check : 0);
        }
    }
}
