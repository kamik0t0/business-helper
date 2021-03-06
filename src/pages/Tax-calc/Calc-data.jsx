import MyInput from "../../UI/input/MyInput/MyInput.jsx";
import PropTypes from "prop-types";

// получаем callback которые изменяют state в родительском компоненте
const CalcData = ({ classes, getIncome, getSalary }) => {
    return (
        <div id="data" className={classes.data}>
            <div className={classes.infoData}>
                Для расчета налоговой нагрузки введите следующие данные в руб.:
            </div>
            <br />

            <div className={classes.inputData}>
                <div className={classes.incomes_block}>
                    <div className={classes.inputName}>Доходы: </div>
                    <MyInput id="incomeLE" type="text" onChange={getIncome} />
                </div>

                <div className={classes.costs_block}>
                    <div className={classes.inputName}>Расходы: </div>
                    <MyInput id="costs" type="text" />
                </div>

                <div className={classes.salary_block}>
                    <div className={classes.inputName}>в т.ч. зарплата: </div>
                    <MyInput
                        id="salaryCosts"
                        type="text"
                        className={classes.inputText}
                        onChange={getSalary}
                    />
                </div>
            </div>
        </div>
    );
};

CalcData.propTypes = {
    classes: PropTypes.object.isRequired,
    getIncome: PropTypes.func.isRequired,
    getSalary: PropTypes.func.isRequired,
};

export default CalcData;
