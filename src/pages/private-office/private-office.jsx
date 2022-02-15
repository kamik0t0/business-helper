import React, { useState, useRef } from "react";
import classes from "./styles/private-office.module.css";
import { Navigate } from "react-router-dom";
import PrivateOfficeModals from "./service/modals/Private-office-modals.jsx";
import { chooseOrg } from "../../utils/getOrgs.js";
import { useSelector, useDispatch } from "react-redux";
import { makeOrgsArr } from "../../utils/orgsList.js";
import MySelect from "../../UI/input/MySelect/MySelect.jsx";
import OrgInfo from "./service/org-info.jsx";
import Buttons from "./service/buttons/buttons.jsx";
import { isOrganization } from "../../utils/isOrg.js";

export default function Office() {
    const isAuth = useSelector((state) => state.authReducer.isAuth);
    const dispatch = useDispatch();
    const [modalAdd, setModalAdd] = useState({ show: false, add: false });
    const [modalRead, setModalRead] = useState({ show: false, add: false });
    const [modalUpdate, setModalUpdate] = useState({ show: false, add: false });
    const [modalDelete, setModalDelete] = useState({ show: false, add: false });
    const [myOrg, setOrg] = useState();
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
                        func={(event) =>
                            setOrg(chooseOrg(event, "myOrg", dispatch))
                        }
                        options={makeOrgsArr(
                            JSON.parse(localStorage.getItem("orgs"))
                        )}
                    />
                    {myOrg === null || myOrg === undefined ? (
                        <div className={classes.noorg}>
                            Выберите или добавьте фирму
                        </div>
                    ) : (
                        <OrgInfo myOrg={myOrg} isORG={isORG.current} />
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
            <PrivateOfficeModals
                setModalAdd={setModalAdd}
                setModalRead={setModalRead}
                setModalUpdate={setModalUpdate}
                setModalDelete={setModalDelete}
                modalAdd={modalAdd}
                modalRead={modalRead}
                modalUpdate={modalUpdate}
                modalDelete={modalDelete}
                isORG={isORG}
                myOrg={myOrg}
                setOrg={setOrg}
            />
        </>
    );
}
