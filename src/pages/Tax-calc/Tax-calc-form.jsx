import React, { useState, useEffect } from "react";
import CalcData from "./Calc-data";
import CalcResult from "./Calc-result";
import classes from "./styles/Tax-calc-form.module.css";
import { localStorateClearing } from "../../utils/localStorageClearing.js";

// объект калькулятор инкапсулирует все расчеты
import { incomesOnlyLLC } from "./calc-obj.js";
import { TaxCalculator, TaxCalculatorIE } from "./service/tax-calc-class.js";

const businessData = new TaxCalculatorIE();

// state в этом компоненте потому что данные нужны и CalcData и CalcResult
export default function CalcForm() {
    useEffect(() => {
        localStorateClearing();
    }, []);
    // УСН доходы ИП
    const [taxIncomeIE, setTaxIncomeIE] = useState(0);
    const [burdenIncomeIE, setBurdenIncomeIE] = useState(0);

    // УСН доходы ООО
    const [taxIncomeLLC, setTaxIncomeLLC] = useState(0);
    const [burdenIncomeLLC, setBurdenIncomeLLC] = useState(0);

    // получение дохода для всех СНО
    function getIncome(event) {
        // console.log("income");
        let value = +event.target.value;
        // УСН доходы ИП
        businessData.income = value;
        // УСН доходы ООО
        incomesOnlyLLC.income = value;
        stateControl();
    }

    // получение зарплаты для всех СНО
    function getSalary(event) {
        let value = +event.target.value;
        // УСН доходы ИП
        businessData.salary = value;
        // УСН доходы ООО
        incomesOnlyLLC.salary = value;
        stateControl();
    }

    function stateControl() {
        setTaxIncomeIE(TaxCalculatorIE.totalTax(businessData));
        setBurdenIncomeIE(TaxCalculatorIE.burden(businessData));
        setTaxIncomeLLC(incomesOnlyLLC.totalTax);
        setBurdenIncomeLLC(incomesOnlyLLC.burden);
    }

    return (
        <div id="calcForm" className={classes.calcForm}>
            <CalcData
                classes={classes}
                getIncome={getIncome}
                getSalary={getSalary}
            />
            <CalcResult
                classes={classes}
                taxIncomeIE={taxIncomeIE}
                burdenIncomeIE={burdenIncomeIE}
                taxIncomeLLC={taxIncomeLLC}
                burdenIncomeLLC={burdenIncomeLLC}
            />
        </div>
    );
}
