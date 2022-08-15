import TextField from "../../UI/input/TextField/TextField";
import PropTypes from "prop-types";
import classes from "./styles/Tax-calc-form.module.css";

type CalcDataType = {
    getIncome: () => void;
    getSalary: () => void;
};

// получаем callback которые изменяют state в родительском компоненте
const CalcData: React.FC<CalcDataType> = ({ getIncome, getSalary }) => {
    return (
        <div id="data" className={classes.data}>
            <div className={classes.infoData}>
                Для расчета налоговой нагрузки введите следующие данные в руб.:
            </div>
            <br />

            <div className={classes.inputData}>
                <div className={classes.incomes_block}>
                    <div className={classes.inputName}>Доходы: </div>
                    <TextField id="incomeLE" type="text" onChange={getIncome} />
                </div>

                <div className={classes.costs_block}>
                    <div className={classes.inputName}>Расходы: </div>
                    <TextField id="costs" type="text" />
                </div>

                <div className={classes.salary_block}>
                    <div className={classes.inputName}>в т.ч. зарплата: </div>
                    <TextField
                        id="salaryCosts"
                        type="text"
                        onChange={getSalary}
                    />
                </div>
            </div>
        </div>
    );
};

// Legacy
CalcData.propTypes = {
    getIncome: PropTypes.func.isRequired,
    getSalary: PropTypes.func.isRequired,
};

export default CalcData;
