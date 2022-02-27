import React, { useState, useEffect } from "react";
import CalcData from "./Calc-data";
import CalcResult from "./Calc-result";
import classes from "./styles/Tax-calc-form.module.css";
import { localStorateClearing } from "../../utils/localStorageClearing.js";

// объект калькулятор инкапсулирует все расчеты
import { incomesOnlyIE } from "./calc-obj.js";
import { incomesOnlyLLC } from "./calc-obj.js";

// state в этом компоненте потому что данные нужны и CalcData и CalcResult
export default function CalcForm() {
    useEffect(() => {
        localStorateClearing();
    }, []);
    console.log("Component re-render");
    // УСН доходы ИП
    const [taxIncomeIE, setTaxIncIE] = useState(0);
    const [burdenIncomeIE, setBurIncIE] = useState(0);

    // УСН доходы ООО
    const [taxIncomeLLC, setTaxIncLLC] = useState(0);
    const [burdenIncomeLLC, setBurIncLLC] = useState(0);

    // получение дохода для всех СНО
    function getIncome(event) {
        // console.log("income");
        let value = +event.target.value;
        // УСН доходы ИП
        incomesOnlyIE.income = value;
        // УСН доходы ООО
        incomesOnlyLLC.income = value;
        stateControl();
    }

    // получение зарплаты для всех СНО
    function getSalary(event) {
        // console.log("salary");
        let value = +event.target.value;
        // УСН доходы ИП
        incomesOnlyIE.salary = value;
        // УСН доходы ООО
        incomesOnlyLLC.salary = value;
        stateControl();
    }

    function stateControl() {
        // console.log("stateControl");
        setTaxIncIE(incomesOnlyIE.totalTax);
        setBurIncIE(incomesOnlyIE.burden);
        setTaxIncLLC(incomesOnlyLLC.totalTax);
        setBurIncLLC(incomesOnlyLLC.burden);
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
