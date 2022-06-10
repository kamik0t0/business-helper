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

export default function ReadCounterparty() {
    const COUNTERPARTY = useSelector(
        (state) => state.setCounterpartyReducer.counterparty
    );
    const isORG = useRef();
    const { setModalRead } = useContext(ModalContext);
    const [, hideModal] = modalManager(setModalRead);
    isORG.current = isOrganization(COUNTERPARTY);
    // если выбрана организация, то добавляются значения реквизитов
    let Requisites = addRequisitesValues(
        OrgFields,
        IpFields,
        COUNTERPARTY,
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
                    {Requisites.map((requisite) => {
                        return <Requisite requisite={requisite} />;
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
