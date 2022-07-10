import classes from "./styles/counterparty.module.css";
import PropTypes from "prop-types";
import classNames from "classnames/bind.js";
import { useCounterparty } from "../../../../hooks/useCounterparty.js";

export default function Counterparty({ number, counterparty }) {
    const selectCounterparty = useCounterparty(number, counterparty);

    const cx = classNames.bind(classes);
    const counterpartyClassName = cx({
        [classes.counterparty]: true,
        [classes.highlight]: counterparty.highlight,
    });

    return (
        <>
            <div onClick={selectCounterparty} className={counterpartyClassName}>
                <div className={classes.counterparty__number}>{number}</div>
                <div className={classes.counterparty__name}>
                    {counterparty.orgname}
                </div>
                <div className={classes.counterparty__inn}>
                    {counterparty.inn}
                </div>
            </div>
        </>
    );
}

Counterparty.propTypes = {
    number: PropTypes.number.isRequired,
    counterparty: PropTypes.object.isRequired,
};
