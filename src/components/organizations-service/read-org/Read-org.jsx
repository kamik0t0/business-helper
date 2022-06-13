import React, { useRef, useContext } from "react";
import { useSelector } from "react-redux";
import classes from "./styles/read-org.module.css";
import { OrgFields } from "../../../utils/Org.js";
import { IpFields } from "../../../utils/Org.js";
import MyButton from "../../../UI/input/MyButton/MyButton.jsx";
import { addRequisitesValues } from "../handlers/addRequisitesValues.js";
import Requisite from "./service/components/ReqField.jsx";
import { isOrganization } from "../../../utils/isOrg";
import { ModalContext } from "../../../blocks/content/Main.jsx";
import { modalManager } from "../../../UI/modal/service/handlers/modal-control.js";
import { MyOrg } from "../../../redux/setMyOrg-reducer.js";

export default function ReadOrg() {
    const MYORG = useSelector(MyOrg);
    const isORG = useRef(isOrganization(MYORG));
    const { setModalRead } = useContext(ModalContext);
    const [, hideModal] = modalManager(setModalRead);
    console.log(process.env);
    // если выбрана организация, то добавляются значения реквизитов
    const Requisites = addRequisitesValues(
        OrgFields,
        IpFields,
        MYORG,
        isORG.current
    );

    return (
        <>
            {Requisites === null ? (
                <div className={classes.read}>
                    <div className={classes.noorg}>Организация не выбрана</div>
                </div>
            ) : (
                <div className={classes.read}>
                    <div className={classes.header}>Реквизиты</div>
                    {Requisites.map((requisite, index) => {
                        return <Requisite key={index} requisite={requisite} />;
                    })}
                    <div className={classes.buttons}>
                        <MyButton onClick={hideModal}>EXCEL</MyButton>
                        <MyButton onClick={hideModal}>Закрыть</MyButton>
                    </div>
                </div>
            )}
        </>
    );
}
