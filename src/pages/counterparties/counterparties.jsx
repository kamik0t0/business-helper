import React, { useState, useRef } from "react";
import classes from "./styles/counterparties.module.css";
import { Navigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CounterpartiesModals from "./service/modals/counterparties-modals.jsx";
import CounterpartiesList from "./service/counterparties-list/counterparties-list";
import Buttons from "./service/buttons/buttons.jsx";
import MyLink from "../../UI/link/MyLink.jsx";
import { highlight } from "../../utils/highlight.js";

export const getCounterparty = React.createContext();

export default function Counterparties() {
    const { params } = useParams();
    const isAuth = useSelector((state) => state.authReducer.isAuth);
    const myOrg = useSelector((state) => state.setMyOrgReducer.myOrg);
    const COUNTERPARTIES = useSelector(
        (state) => state.setCounterparties.counterparties
    );
    const dispatch = useDispatch();
    const [modalAdd, setModalAdd] = useState({ show: false, add: false });
    const [modalRead, setModalRead] = useState({ show: false, add: false });
    const [modalUpdate, setModalUpdate] = useState({ show: false, add: false });
    const [modalDelete, setModalDelete] = useState({ show: false, add: false });
    let row = useRef(null);

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
                        <getCounterparty.Provider
                            value={(event, number) => {
                                dispatch({
                                    type: "COUNTERPARTY",
                                    payload: COUNTERPARTIES[number],
                                });
                                localStorage.setItem(
                                    "counterpartyId",
                                    COUNTERPARTIES[number].id
                                );
                                highlight(
                                    number,
                                    COUNTERPARTIES,
                                    () =>
                                        dispatch({
                                            type: "COUNTERPARTIES",
                                            payload: [...COUNTERPARTIES],
                                        }),
                                    row
                                );
                            }}
                        >
                            <CounterpartiesList
                                counterparties={COUNTERPARTIES}
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
            />
        </>
    );
}
