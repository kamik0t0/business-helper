import { useState } from "react";
import { TaxCalculatorIE, TaxCalculatorLLC } from "../service/tax-calc-class";

export function useTaxCalc() {
    const [tax, setTax] = useState({
        salary: 0,
        income: 0,
        taxIncomeIE: 0,
        burdenIncomeIE: 0,
        taxIncomeLLC: 0,
        burdenIncomeLLC: 0,
    });

    function results(newDataIE, newDataLLC) {
        let taxIncomeIE = TaxCalculatorIE.totalTax(newDataIE),
            taxIncomeLLC = TaxCalculatorLLC.totalTax(newDataLLC),
            burdenIncomeIE = TaxCalculatorIE.burden(newDataIE),
            burdenIncomeLLC = TaxCalculatorLLC.burden(newDataLLC),
            salary = newDataIE.salary || newDataLLC.salary,
            income = newDataIE.income || newDataLLC.income;

        setTax({
            salary,
            income,
            taxIncomeIE,
            taxIncomeLLC,
            burdenIncomeIE,
            burdenIncomeLLC,
        });
    }

    // получение дохода для всех СНО
    function calcIncome(event) {
        let value = +event.target.value;
        // УСН доходы ИП
        const newBusinessDataIE = Object.assign(
            {},
            new TaxCalculatorIE(
                Number(process.env.REACT_APP_SALARYTAXRATE),
                Number(process.env.REACT_APP_MEDICALFIXINSURANCE),
                Number(process.env.REACT_APP_RETIREMENTFIXINSURANCE)
            ),
            {
                income: value || 0,
                salary: tax.salary || 0,
            }
        );
        const newBusinessDataLLC = Object.assign(
            {},
            new TaxCalculatorLLC(Number(process.env.REACT_APP_SALARYTAXRATE)),
            {
                income: value || 0,
                salary: tax.salary || 0,
            }
        );
        // УСН доходы ООО
        results(newBusinessDataIE, newBusinessDataLLC);
    }

    // получение зарплаты для всех СНО
    function calcSalary(event) {
        let value = +event.target.value;
        // УСН доходы ИП
        const newBusinessDataIE = Object.assign(
            {},
            new TaxCalculatorIE(
                Number(process.env.REACT_APP_SALARYTAXRATE),
                Number(process.env.REACT_APP_MEDICALFIXINSURANCE),
                Number(process.env.REACT_APP_RETIREMENTFIXINSURANCE)
            ),
            {
                salary: value || 0,
                income: tax.income || 0,
            }
        );
        const newBusinessDataLLC = Object.assign(
            {},
            new TaxCalculatorLLC(Number(process.env.REACT_APP_SALARYTAXRATE)),
            {
                salary: value || 0,
                income: tax.income || 0,
            }
        );
        // УСН доходы ООО
        results(newBusinessDataIE, newBusinessDataLLC);
    }

    return [tax, calcIncome, calcSalary];
}
