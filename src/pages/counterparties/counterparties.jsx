import React from "react";
import classes from "./styles/counterparties.module.css";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CounterpartiesModals from "./service/modals/counterparties-modals.jsx";
import CounterpartiesList from "./service/counterparties-list/counterparties-list";
import Buttons from "./service/buttons/buttons.jsx";
import MyLink from "../../UI/link/MyLink.jsx";
import { useCounterparty } from "../../hooks/useCounterparty.js";

export const getCounterparty = React.createContext();

export default function Counterparties() {
    const isAuth = useSelector((state) => state.authReducer.isAuth);
    const myOrg = useSelector((state) => state.setMyOrgReducer.myOrg);
    const grabCounterparty = useCounterparty();

    return (
        <>
            {isAuth ? (
                <div className={classes.content}>
                    <div className={classes.header}>
                        <div className={classes.header_items}>
                            {localStorage.getItem("email")}
                        </div>
                    </div>
                    {myOrg ? (
                        <getCounterparty.Provider value={grabCounterparty}>
                            <CounterpartiesList />
                            <Buttons />
                        </getCounterparty.Provider>
                    ) : (
                        <div className={classes.nocounterparties}>
                            Выберите организацию в
                            <MyLink path="/private"> личном кабинете</MyLink>
                        </div>
                    )}
                </div>
            ) : (
                <Navigate to="/" />
            )}
            <CounterpartiesModals />
        </>
    );
}
