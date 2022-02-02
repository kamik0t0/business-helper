import React, { useState, useRef, useEffect } from "react";
import classes from "./private-office.module.css";
import { Link, Navigate } from "react-router-dom";
import Modal from "../../utils/modal/modal.jsx";
import CreateOrg from "./Create-org.jsx";
import MyButton from "../../utils/input/MyButton";
import { chooseOrg } from "../../utils/getOrgs.js";
import { useSelector } from "react-redux";
import DeleteOrg from "./Delete-org.jsx";
import PatchOrg from "./Patch-org.jsx";
import ReadOrg from "./Read-org.jsx";
import { makeOrgsArr } from "../../utils/orgsList.js";
import MySelect from "../../utils/input/MySelect.jsx";

export default function Office() {
    const isAuth = useSelector((state) => state.authReducer.isAuth);
    const [modalAdd, setModalAdd] = useState(false);
    const [modalRead, setModalRead] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [activeOrg, setActiveOrg] = useState();
    // загрузка

    useEffect(() => {
        try {
            setActiveOrg(JSON.parse(localStorage.getItem("currentOrg")));
        } catch (error) {
            localStorage.removeItem("currentOrg");
        }
    }, []);

    // значение переменной должно быть доступно после перерендирнга => useRef
    let isORG = useRef();
    // ООО или ИП
    try {
        isORG.current =
            activeOrg.kpp === "null" ||
            activeOrg.kpp === null ||
            activeOrg.kpp === undefined ||
            activeOrg.kpp === "undefined"
                ? (isORG.current = false)
                : (isORG.current = true);
    } catch (error) {
        console.log("Организация не выбрана");
    }

    function setCurrentOrg(event) {
        let currentOrg = chooseOrg(event);
        if (currentOrg === undefined) return;
        isORG.current =
            currentOrg.kpp === null
                ? (isORG.current = false)
                : (isORG.current = true);
        setActiveOrg(currentOrg);
    }

    return (
        <>
            {/* если одно из условий верно, то компонент рендерится */}
            {localStorage.getItem("session") === "true" || isAuth ? (
                <div className={classes.content}>
                    <div className={classes.header}>
                        <Link className={classes.link} to="/">
                            На главную
                        </Link>

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
                        defaultValue={
                            activeOrg === null ||
                            activeOrg === undefined ||
                            activeOrg === "undefined" ||
                            !activeOrg
                                ? makeOrgsArr(
                                      JSON.parse(localStorage.getItem("orgs"))
                                  )[0]
                                : activeOrg.orgname
                        }
                        func={setCurrentOrg}
                        options={makeOrgsArr(
                            JSON.parse(localStorage.getItem("orgs"))
                        )}
                    />
                    {activeOrg === null || activeOrg === undefined ? (
                        <div className={classes.noorg}>
                            Выберите или добавьте фирму
                        </div>
                    ) : (
                        <>
                            <div className={classes.info}>
                                <div className={classes.info_item}>
                                    <div className={classes.info_name}>
                                        Активная фирма:{" "}
                                    </div>

                                    <div className={classes.info_value}>
                                        {`${activeOrg.opf} `}
                                        {isORG.current
                                            ? `"${activeOrg.orgname}"`
                                            : activeOrg.orgname}
                                    </div>
                                </div>
                                <div className={classes.info_item}>
                                    <div className={classes.info_name}>
                                        ИНН / КПП:{" "}
                                    </div>
                                    {isORG.current ? (
                                        <div className={classes.info_value}>
                                            {`${activeOrg.inn} / ${activeOrg.kpp}`}
                                        </div>
                                    ) : (
                                        <div className={classes.info_value}>
                                            {`${activeOrg.inn} `}
                                        </div>
                                    )}
                                </div>
                                <div className={classes.info_item}>
                                    <div className={classes.info_name}>
                                        Адрес:{" "}
                                    </div>
                                    <div className={classes.info_value}>
                                        {activeOrg.address}
                                    </div>
                                </div>
                                {isORG.current && (
                                    <div className={classes.info_item}>
                                        <div className={classes.info_name}>
                                            Руководитель:{" "}
                                        </div>
                                        <div className={classes.info_value}>
                                            {activeOrg.director}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    <div className={classes.buttons}>
                        {" "}
                        <MyButton onClick={() => setModalAdd(!modalAdd)}>
                            Добавить
                        </MyButton>
                        <MyButton onClick={() => setModalRead(!modalRead)}>
                            Реквизиты
                        </MyButton>
                        <MyButton onClick={() => setModalUpdate(!modalAdd)}>
                            Изменить
                        </MyButton>
                        <MyButton onClick={() => setModalDelete(!modalAdd)}>
                            Удалить
                        </MyButton>
                    </div>
                </div>
            ) : (
                <Navigate to="/" />
            )}
            <Modal
                size={{ height: "75vh", width: "75vw" }}
                active={modalAdd}
                setActive={setModalAdd}
            >
                <CreateOrg setActive={setModalAdd} setOrg={setActiveOrg} />
            </Modal>
            <Modal active={modalRead} setActive={setModalRead}>
                <ReadOrg
                    setActive={setModalRead}
                    org={activeOrg}
                    isORG={isORG.current}
                />
            </Modal>
            <Modal active={modalUpdate} setActive={setModalUpdate}>
                <PatchOrg
                    setActive={setModalUpdate}
                    org={activeOrg}
                    setOrg={setActiveOrg}
                    isORG={isORG.current}
                />
            </Modal>
            <Modal
                size={{ height: "25vh", width: "40vw" }}
                active={modalDelete}
                setActive={setModalDelete}
            >
                <DeleteOrg
                    setActive={setModalDelete}
                    org={activeOrg}
                    setOrg={setActiveOrg}
                />
            </Modal>
        </>
    );
}
