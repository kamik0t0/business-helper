import React, { useState, useRef } from "react";
import classes from "./styles/counterparties.module.css";
import { Navigate } from "react-router-dom";
import Modal from "../../UI/modal/modal.jsx";
import CreateOrg from "../../components/organizations-service/create-org/Create-org.jsx";
import { useSelector } from "react-redux";
import DeleteOrg from "../../components/organizations-service/delete-org/Delete-org.jsx";
import PatchOrg from "../../components/organizations-service/update-org/Patch-org.jsx";
import ReadOrg from "../../components/organizations-service/read-org/Read-org.jsx";
import CounterpartiesList from "./service/counterparties-list/counterparties-list";
import Buttons from "./service/buttons/buttons.jsx";

// import { isOrganization } from "./service/handlers/isOrg.js";

export default function Counterparties() {
    const isAuth = useSelector((state) => state.authReducer.isAuth);

    const [modalAdd, setModalAdd] = useState({ show: false, add: false });
    const [modalRead, setModalRead] = useState({ show: false, add: false });
    const [modalUpdate, setModalUpdate] = useState({ show: false, add: false });
    const [modalDelete, setModalDelete] = useState({ show: false, add: false });
    const [counterparty, setCounterparty] = useState();

    // значение переменной должно быть доступно после перерендирнга => useRef
    let isORG = useRef();

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
                    <CounterpartiesList />
                    <Buttons
                        setModalAdd={setModalAdd}
                        setModalRead={setModalRead}
                        setModalUpdate={setModalUpdate}
                        setModalDelete={setModalDelete}
                    />
                </div>
            ) : (
                <Navigate to="/" />
            )}
            {
                <>
                    {modalAdd.show && (
                        <Modal
                            size={{ height: "75vh", width: "75vw" }}
                            active={modalAdd.add}
                            setActive={setModalAdd}
                        >
                            <CreateOrg
                                setModal={setModalAdd}
                                setActiveOrg={setCounterparty}
                                url="http://localhost:5600/counterparty"
                                // url="https://deploy-test-business-assist.herokuapp.com/counterparty"
                                type="counterparty"
                                idType="OrgsId"
                            />
                        </Modal>
                    )}
                    {modalRead.show && (
                        <Modal active={modalRead.add} setActive={setModalRead}>
                            <ReadOrg
                                setModal={setModalRead}
                                org={counterparty}
                                noselected="Организация не выбрана"
                            />
                        </Modal>
                    )}
                    {modalUpdate.show && (
                        <Modal
                            active={modalUpdate.add}
                            setActive={setModalUpdate}
                        >
                            <PatchOrg
                                setModal={setModalUpdate}
                                org={counterparty}
                                setActiveOrg={setCounterparty}
                                isORG={isORG.current}
                                type="counterparty"
                                noselected="Организация не выбрана"
                                url="http://localhost:5600/counterparty"
                                // url="https://deploy-test-business-assist.herokuapp.com/counterparty"
                            />
                        </Modal>
                    )}
                    {modalDelete.show && (
                        <Modal
                            size={{ height: "25vh", width: "40vw" }}
                            active={modalDelete.add}
                            setActive={setModalDelete}
                        >
                            <DeleteOrg
                                setModal={setModalDelete}
                                setActiveOrg={setCounterparty}
                                counterparty={counterparty}
                                type="counterparty"
                                url="http://localhost:5600/counterparty"
                                // url="https://deploy-test-business-assist.herokuapp.com/counterparty"
                                noselected="Организация не выбрана"
                            />
                        </Modal>
                    )}
                </>
            }
        </>
    );
}
