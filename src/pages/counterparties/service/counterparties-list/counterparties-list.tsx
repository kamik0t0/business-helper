import classes from "./style/counterparties-list.module.css";
import Counterparty from "../counterparty/counterparty";
import { v4 as uuid } from "uuid";
import { useTypedSelector } from "../../../../redux/hooks/hooks";

const CounterpartiesList: React.FC = () => {
    const { counterparties } = useTypedSelector(
        (state) => state.counterpartyReducer
    );
    return (
        <>
            {
                <div className={classes.counterparties}>
                    <div className={classes.col_header}>
                        <div className={classes.header__number}>№</div>
                        <div className={classes.header__name}>Наименование</div>
                        <div className={classes.header__inn}>ИНН</div>
                    </div>
                    {counterparties.length !== 0 ? (
                        counterparties.map((counterparty, index) => {
                            return (
                                <Counterparty
                                    key={uuid()}
                                    counterparty={counterparty}
                                    index={index}
                                />
                            );
                        })
                    ) : (
                        <div className={classes.nocounterparties}>
                            Добавьте контрагентов
                        </div>
                    )}
                </div>
            }
        </>
    );
};

export default CounterpartiesList;
