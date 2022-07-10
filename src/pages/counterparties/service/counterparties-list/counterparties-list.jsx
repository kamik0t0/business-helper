import React from "react";
import classes from "./style/counterparties-list.module.css";
import Counterparty from "../counterparty/counterparty.jsx";
import { v4 as uuid } from "uuid";
import { useTypedSelector } from "../../../../redux/hooks/hooks";

export default function CounterpartiesList() {
    const COUNTERPARTIES = useTypedSelector(
        (state) => state.counterpartyReducer.counterparties
    );
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
                                    counterparty={counterparty}
                                    number={number}
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
