import React from "react";
import CalcData from "./Calc-data";
import CalcResult from "./Calc-result";
import classes from "./styles/Tax-calc-form.module.css";
import { useTaxCalc } from "./hooks/useTaxCalc";

export default function CalcForm() {
    const [tax, calcIncome, calcSalary] = useTaxCalc();

    return (
        <div id="calcForm" className={classes.calcForm}>
            <CalcData
                classes={classes}
                getIncome={calcIncome}
                getSalary={calcSalary}
            />
            <CalcResult
                classes={classes}
                taxIncomeIE={tax.taxIncomeIE}
                burdenIncomeIE={tax.burdenIncomeIE}
                taxIncomeLLC={tax.taxIncomeLLC}
                burdenIncomeLLC={tax.burdenIncomeLLC}
            />
        </div>
    );
}
