import React, { useState, useRef, useEffect } from "react";
import classes from "./styles/private-office.module.css";
import { Navigate } from "react-router-dom";
import PrivateOfficeModals from "./service/modals/Private-office-modals.jsx";
import { chooseMyOrg } from "../../utils/getOrgs.js";
import { useSelector, useDispatch } from "react-redux";
import { makeOrgsArr } from "../../utils/orgsList.js";
import MySelect from "../../UI/input/MySelect/MySelect.jsx";
import OrgInfo from "./service/org-info.jsx";
import Buttons from "./service/buttons/buttons.jsx";
import { isOrganization } from "../../utils/isOrg.js";
import { localStorateClearing } from "../../utils/localStorageClearing.js";
import { getData } from "../../utils/getData.js";

export default function Office() {
    const ORGS = useSelector((state) => state.setOrgsReducer.orgs);
    const isAuth = useSelector((state) => state.authReducer.isAuth);
    const MYORG = useSelector((state) => state.setMyOrgReducer.myOrg);
    const dispatch = useDispatch();
    const [modalAdd, setModalAdd] = useState({ show: false, add: false });
    const [modalRead, setModalRead] = useState({ show: false, add: false });
    const [modalUpdate, setModalUpdate] = useState({ show: false, add: false });
    const [modalDelete, setModalDelete] = useState({ show: false, add: false });
    const [loader, setLoader] = useState(false);
    let isORG = useRef();
    // ООО или ИП
    isORG.current = isOrganization(MYORG);

    useEffect(() => {
        localStorateClearing();
    }, []);
    // инлайн стили для select в личном кабинете (выбор организации)
    const customInlineStyles = {
        height: "30px",
        fontSize: "1.3em",
        fontWeight: "700",
        margin: "0 auto 30px auto",
    };

    async function getOrgDataVoid(event) {
        setLoader(!loader);
        const MYORG = chooseMyOrg(event, ORGS);
        dispatch({ type: "MYORG", payload: MYORG });
        // контрагенты
        const COUNTERPARTIES = await getData(
            `/counterparty/?OrgId=${localStorage.getItem("OrgsId")}`,
            () =>
                dispatch({
                    type: "REG_FALSE",
                    payload: false,
                })
        );
        // продажи
        const SALES = await getData(
            `/sales/?OrgId=${localStorage.getItem("OrgsId")}`,
            () =>
                dispatch({
                    type: "REG_FALSE",
                    payload: false,
                })
        );
        // покупки
        const PURCHASES = await getData(
            `/purchases/?OrgId=${localStorage.getItem("OrgsId")}`,
            () =>
                dispatch({
                    type: "REG_FALSE",
                    payload: false,
                })
        );

        dispatch({ type: "COUNTERPARTIES", payload: COUNTERPARTIES });
        dispatch({ type: "SALES", payload: SALES });
        dispatch({ type: "PURCHASES", payload: PURCHASES });

        setLoader(!loader);
    }
    return (
        <>
            {isAuth ? (
                <div className={classes.content}>
                    <div className={classes.header}>
                        <div className={classes.header_items}>
                            {localStorage.getItem("email")}
                        </div>
                    </div>
                    <MySelect
                        styleFieldName={customInlineStyles}
                        id="ORG"
                        multiple={false}
                        defaultValue={["Выбрать организацию"][0]}
                        func={getOrgDataVoid}
                        options={makeOrgsArr(ORGS)}
                    />
                    {Object.keys(MYORG).length === 0 ? (
                        <div className={classes.noorg}>
                            Выберите или добавьте фирму
                        </div>
                    ) : (
                        <OrgInfo MYORG={MYORG} isORG={isORG.current} />
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
            />
        </>
    );
}
