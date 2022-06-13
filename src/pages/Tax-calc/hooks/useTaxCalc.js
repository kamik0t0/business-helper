import { useState } from "react";
import { incomesOnlyLLC } from "../calc-obj";
import { TaxCalculatorIE } from "../service/tax-calc-class";

const businessData = new TaxCalculatorIE();

export function useTaxCalc() {
    const [tax, setTax] = useState({
        taxIncomeIE: 0,
        burdenIncomeIE: 0,
        taxIncomeLLC: 0,
        burdenIncomeLLC: 0,
    });

    function results() {
        let taxIncomeIE = TaxCalculatorIE.totalTax(businessData),
            burdenIncomeIE = TaxCalculatorIE.burden(businessData),
            taxIncomeLLC = incomesOnlyLLC.totalTax,
            burdenIncomeLLC = incomesOnlyLLC.burden;

        setTax({
            taxIncomeIE,
            burdenIncomeIE,
            taxIncomeLLC,
            burdenIncomeLLC,
        });
    }

    // получение дохода для всех СНО
    function calcIncome(event) {
        let value = +event.target.value;
        // УСН доходы ИП
        businessData.income = value;
        // УСН доходы ООО
        incomesOnlyLLC.income = value;
        results();
    }

    // получение зарплаты для всех СНО
    function calcSalary(event) {
        let value = +event.target.value;
        // УСН доходы ИП
        businessData.salary = value;
        // УСН доходы ООО
        incomesOnlyLLC.salary = value;
        results();
    }

    return [tax, calcIncome, calcSalary];
}
