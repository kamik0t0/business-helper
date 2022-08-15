import classes from "./styles/counterparty.module.css";
import classNames from "classnames/bind.js";
import { useCounterparty } from "../hooks/useCounterparty";
import { ICounterparty } from "../../../../interfaces/counterparty";

type CounterprtyTypes = {
    index: number;
    counterparty: ICounterparty;
};

const Counterparty: React.FC<CounterprtyTypes> = ({ index, counterparty }) => {
    const selectCounterparty = useCounterparty(index, counterparty);

    const cx = classNames.bind(classes);
    const counterpartyClassName = cx({
        [classes.counterparty]: true,
        [classes.highlight]: counterparty.highlight,
    });

    return (
        <>
            <div onClick={selectCounterparty} className={counterpartyClassName}>
                <div className={classes.counterparty__number}>{index + 1}</div>
                <div className={classes.counterparty__name}>
                    {counterparty.orgname}
                </div>
                <div className={classes.counterparty__inn}>
                    {counterparty.inn}
                </div>
            </div>
        </>
    );
};

export default Counterparty;
