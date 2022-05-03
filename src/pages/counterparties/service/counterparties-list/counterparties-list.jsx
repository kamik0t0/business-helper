import React from "react";
import classes from "./style/counterparties-list.module.css";
import Counterparty from "../counterparty/counterparty.jsx";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";
import { useSelector } from "react-redux";

export default function CounterpartiesList() {
    const COUNTERPARTIES = useSelector(
        (state) => state.setCounterparties.counterparties
    );
    console.log(COUNTERPARTIES);
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
                    {COUNTERPARTIES.length !== 0 ? (
                        COUNTERPARTIES.map((counterparty, number) => {
                            return (
                                <Counterparty
                                    key={uuid()}
                                    number={number}
                                    counterparty={counterparty}
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
