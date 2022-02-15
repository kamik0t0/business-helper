import React, { useContext } from "react";
import { getCounterparty } from "../../counterparties.jsx";
import classes from "./styles/counterparty.module.css";
import PropTypes from "prop-types";

export default function Counterparty({ number, name, inn, highlight }) {
    const getValue = useContext(getCounterparty);
    return (
        <>
            <div
                onClick={(event) => getValue(event, number)}
                className={
                    highlight
                        ? classes.counterparty + " " + classes.highlight
                        : classes.counterparty
                }
            >
                <div className={classes.counterparty__number}>{number}</div>
                <div className={classes.counterparty__name}>{name}</div>
                <div className={classes.counterparty__inn}>{inn}</div>
            </div>
        </>
    );
}

Counterparty.propTypes = {
    number: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    inn: PropTypes.string.isRequired,
    highlight: PropTypes.bool,
};
