import React from "react";
import classes from "./style/counterparties-list.module.css";
import Counterparty from "../counterparty/counterparty.jsx";

export default function CounterpartiesList() {
    let counterparties = JSON.parse(localStorage.getItem("counterparties"));
    console.log(typeof counterparties);
    return (
        <>
            <div className={classes.header}>Контрагенты</div>

            {
                <div className={classes.counterparties}>
                    <div className={classes.col_header}>
                        <div className={classes.header__number}>№</div>
                        <div className={classes.header__name}>Наименование</div>
                        <div className={classes.header__inn}>ИНН</div>
                    </div>
                    {counterparties.length === 0 &&
                    Array.isArray(counterparties) === false ? (
                        <div>Добавьте контрагентов</div>
                    ) : (
                        counterparties.map((counterparty, number) => {
                            return (
                                <Counterparty
                                    key={counterparty.inn}
                                    number={number + 1}
                                    name={counterparty.orgname}
                                    inn={counterparty.inn}
                                />
                            );
                        })
                    )}
                </div>
            }
        </>
    );
}
