import React from "react";
import classes from "./styles/counterparty.module.css";

export default function Counterparty({ number, name, inn }) {
    return (
        <>
            <div className={classes.counterparty}>
                <div className={classes.counterparty__number}>{number}</div>
                <div className={classes.counterparty__name}>{name}</div>
                <div className={classes.counterparty__inn}>{inn}</div>
            </div>
        </>
    );
}
