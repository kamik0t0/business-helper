import React, { useState, useRef } from "react";
import classes from "./styles/private-office.module.css";
import { Navigate } from "react-router-dom";
import PrivateOfficeModals from "./service/modals/Private-office-modals.jsx";
import { useSelector, useDispatch } from "react-redux";
import { makeOrgsArr } from "../../utils/orgsList.js";
import MySelect from "../../UI/input/MySelect/MySelect.jsx";
import OrgInfo from "./service/org-info.jsx";
import Buttons from "./service/buttons/buttons.jsx";
import { isOrganization } from "../../utils/isOrg.js";
// функция аналогичная getPrivateData но работает с redux-thunk.
import { getOrgDataVoid } from "./service/getOrgDataVoid.js";
import { getPrivateData } from "../../redux/saga/private-saga.js";
import { orgsSelector } from "../../redux/orgs-reducer";

export default function Office() {
    const ORGS = useSelector(orgsSelector);
    const isAuth = useSelector((state) => state.authReducer.isAuth);
    const MYORG = useSelector((state) => state.setMyOrgReducer.myOrg);
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    let isORG = useRef();
    // ООО или ИП
    isORG.current = isOrganization(MYORG);
    // работа с состоянием через Redux Saga
    function getMyOrgData(event) {
        return dispatch(
            getPrivateData(event, () => setLoader((loader) => !loader), ORGS)
        );
    }

    // инлайн стили для select в личном кабинете (выбор организации)
    const customInlineStyles = {
        height: "30px",
        fontSize: "1.3em",
        fontWeight: "700",
        margin: "0 auto 30px auto",
    };

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
                        func={getMyOrgData}
                        options={makeOrgsArr(ORGS)}
                    />
                    {Object.keys(MYORG).length === 0 ? (
                        <div className={classes.noorg}>
                            Выберите или добавьте фирму
                        </div>
                    ) : (
                        <OrgInfo isORG={isORG.current} />
                    )}
                    <Buttons />
                </div>
            ) : (
                <Navigate to="/" />
            )}
            <PrivateOfficeModals />
        </>
    );
}
