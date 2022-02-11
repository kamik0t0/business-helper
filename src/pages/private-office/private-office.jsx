import React, { useState, useRef, useEffect } from "react";
import classes from "./styles/private-office.module.css";
import { Navigate } from "react-router-dom";
import Modal from "../../UI/modal/modal.jsx";
import CreateOrg from "../../components/organizations-service/create-org/Create-org.jsx";
import { chooseOrg } from "../../utils/getOrgs.js";
import { useSelector } from "react-redux";
import DeleteOrg from "../../components/organizations-service/delete-org/Delete-org.jsx";
import PatchOrg from "../../components/organizations-service/update-org/Patch-org.jsx";
import ReadOrg from "../../components/organizations-service/read-org/Read-org.jsx";
import { makeOrgsArr } from "../../utils/orgsList.js";
import MySelect from "../../UI/input/MySelect/MySelect.jsx";
import OrgInfo from "./service/org-info.jsx";
import Buttons from "./service/buttons/buttons.jsx";
import { isOrganization } from "./service/handlers/isOrg.js";
import { getCounterpartiesFromDB } from "../../utils/getDataByForeignKey.js";

export default function Office() {
    const isAuth = useSelector((state) => state.authReducer.isAuth);

    const [modalAdd, setModalAdd] = useState({ show: false, add: false });
    const [modalRead, setModalRead] = useState({ show: false, add: false });
    const [modalUpdate, setModalUpdate] = useState({ show: false, add: false });
    const [modalDelete, setModalDelete] = useState({ show: false, add: false });

    const [myOrg, setActiveOrg] = useState();

    // попытка отрендерить компонент с заданной организацией если таковая уже есть, т.е. если пользователь в предыдущей сессии работал с некоторой организацией, то при новом входе в систему должен видеть эту же активную организацию в личном кабинете
    useEffect(() => {
        try {
            setActiveOrg(JSON.parse(localStorage.getItem("myOrg")));
        } catch (error) {
            localStorage.removeItem("myOrg");
        }
    }, []);
    // значение переменной должно быть доступно после перерендирнга => useRef
    let isORG = useRef();
    // ООО или ИП
    isORG.current = isOrganization(myOrg);
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
                    <MySelect
                        styleFieldName={{
                            height: "30px",
                            fontSize: "1.3em",
                            fontWeight: "700",
                            margin: "0 auto 30px auto",
                        }}
                        id="ORG"
                        multiple={false}
                        defaultValue={["Выбрать организацию"][0]}
                        func={(event) => {
                            setActiveOrg(chooseOrg(event, "myOrg"));
                            getCounterpartiesFromDB(
                                `http://localhost:5600/counterparty/?OrgsId=${localStorage.getItem(
                                    "OrgsId"
                                )}`
                            );
                        }}
                        options={makeOrgsArr(
                            JSON.parse(localStorage.getItem("orgs"))
                        )}
                    />
                    {myOrg === null || myOrg === undefined ? (
                        <div className={classes.noorg}>
                            Выберите или добавьте фирму
                        </div>
                    ) : (
                        <OrgInfo myOrg={myOrg} isORG={isORG} />
                    )}
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
                                setActiveOrg={setActiveOrg}
                                url="http://localhost:5600/private"
                                // url="https://deploy-test-business-assist.herokuapp.com/private"
                                type="myOrg"
                                idType="UserId"
                            />
                        </Modal>
                    )}
                    {modalRead.show && (
                        <Modal active={modalRead.add} setActive={setModalRead}>
                            <ReadOrg
                                setModal={setModalRead}
                                org={myOrg}
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
                                org={myOrg}
                                setActiveOrg={setActiveOrg}
                                isORG={isORG.current}
                                type="myOrg"
                                noselected="Организация не выбрана"
                                url="http://localhost:5600/private"
                                // url="https://deploy-test-business-assist.herokuapp.com/private"
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
                                setActiveOrg={setActiveOrg}
                                myOrg={myOrg}
                                type="myOrg"
                                url="http://localhost:5600/private"
                                // url="https://deploy-test-business-assist.herokuapp.com/private"
                                noselected="Организация не выбрана"
                            />
                        </Modal>
                    )}
                </>
            }
        </>
    );
}
