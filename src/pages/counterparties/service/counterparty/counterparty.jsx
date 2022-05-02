import React, { useContext } from "react";
import { getCounterparty } from "../../counterparties.jsx";
import classes from "./styles/counterparty.module.css";
import PropTypes from "prop-types";

export default function Counterparty({ number, counterparty }) {
    const getValue = useContext(getCounterparty);
    return (
        <>
            <div
                onClick={(event) => getValue(event, number)}
                className={
                    counterparty.highlight
                        ? classes.counterparty + " " + classes.highlight
                        : classes.counterparty
                }
            >
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
};
