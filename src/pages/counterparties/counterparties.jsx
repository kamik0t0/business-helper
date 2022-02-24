import React, { useState, useRef } from "react";
import classes from "./styles/counterparties.module.css";
import { Navigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import CounterpartiesModals from "./service/modals/counterparties-modals.jsx";
import CounterpartiesList from "./service/counterparties-list/counterparties-list";
import Buttons from "./service/buttons/buttons.jsx";
import MyLink from "../../UI/link/MyLink.jsx";
import { getValue } from "./service/handlers/getValue.js";

export const getCounterparty = React.createContext();

export default function Counterparties({ path }) {
    const { params } = useParams();

    const isAuth = useSelector((state) => state.authReducer.isAuth);
    const isMyOrgSelected = useSelector(
        (state) => state.myOrgReducer.isMyOrgSelected
    );
    const [modalAdd, setModalAdd] = useState({ show: false, add: false });
    const [modalRead, setModalRead] = useState({ show: false, add: false });
    const [modalUpdate, setModalUpdate] = useState({ show: false, add: false });
    const [modalDelete, setModalDelete] = useState({ show: false, add: false });
    const [counterparty, setCounterparty] = useState();
    const [counterparties, setCounterparties] = useState(
        JSON.parse(localStorage.getItem("counterparties")) === null
            ? []
            : JSON.parse(localStorage.getItem("counterparties"))
    );
    // значение переменной должно быть доступно после перерендирнга => useRef
    let isORG = useRef();
    let row = useRef(null);
    return (
        <>
            {/* если одно из условий верно, то компонент рендерится */}
            {localStorage.getItem("session") === "true" || isAuth ? (
                <div className={classes.content}>
                    <div className={classes.header}>
                        <div className={classes.header_items}>
                            {localStorage.getItem("email")}
                        </div>
                    </div>
                    {localStorage.getItem("session") === "true" &&
                    isMyOrgSelected ? (
                        <getCounterparty.Provider
                            value={(event, number) =>
                                getValue(
                                    event,
                                    number,
                                    counterparties,
                                    setCounterparties,
                                    row,
                                    setCounterparty
                                )
                            }
                        >
                            <CounterpartiesList
                                counterparties={
                                    counterparties ? counterparties : []
                                }
                            />
                            <Buttons
                                setModalAdd={setModalAdd}
                                setModalRead={setModalRead}
                                setModalUpdate={setModalUpdate}
                                setModalDelete={setModalDelete}
                                params={params.slice(1)}
                            />
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
            <CounterpartiesModals
                setModalAdd={setModalAdd}
                setModalRead={setModalRead}
                setModalUpdate={setModalUpdate}
                setModalDelete={setModalDelete}
                modalAdd={modalAdd}
                modalRead={modalRead}
                modalUpdate={modalUpdate}
                modalDelete={modalDelete}
                isORG={isORG}
                setCounterparties={setCounterparties}
                counterparty={counterparty}
            />
        </>
    );
}
