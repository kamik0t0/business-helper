import CalcData from "./Calc-data";
import CalcResult from "./Calc-result";
import { useTaxCalc } from "./hooks/useTaxCalc";
import classes from "./styles/Tax-calc-form.module.css";

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
