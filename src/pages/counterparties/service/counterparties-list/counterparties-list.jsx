import React from "react";
import classes from "./style/counterparties-list.module.css";
import Counterparty from "../counterparty/counterparty.jsx";
import PropTypes from "prop-types";

export default function CounterpartiesList({ counterparties }) {
    console.log(counterparties);
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
                    {counterparties.length !== 0 ? (
                        counterparties.map((counterparty, number) => {
                            return (
                                <Counterparty
                                    key={counterparty.inn}
                                    highlight={counterparty.highlight}
                                    number={number + 1}
                                    name={counterparty.orgname}
                                    inn={counterparty.inn}
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
}

CounterpartiesList.propTypes = {
    counterparties: PropTypes.array,
};
