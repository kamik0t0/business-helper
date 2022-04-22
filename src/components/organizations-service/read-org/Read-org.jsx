import React, { useRef } from "react";
import { useSelector } from "react-redux";
import classes from "./styles/read-org.module.css";
import { OrgFields } from "../../../utils/Org.js";
import { IpFields } from "../../../utils/Org.js";
import MyButton from "../../../UI/input/MyButton/MyButton.jsx";
import { hideAnimatedModal } from "../../../UI/modal/service/handlers/modal-control.js";
import { addRequisitesValues } from "../handlers/addRequisitesValues.js";
import Requisite from "./service/components/ReqField.jsx";
import PropTypes from "prop-types";
import { isOrganization } from "../../../utils/isOrg";

export default function ReadOrg({ setModal }) {
    const MYORG = useSelector((state) => state.setMyOrgReducer.myOrg);
    const isORG = useRef();
    isORG.current = isOrganization(MYORG);
    // если выбрана организация, то добавляются значения реквизитов
    let Requisites = addRequisitesValues(
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
                    {Requisites.map((requisite) => {
                        return <Requisite requisite={requisite} />;
                    })}
                    <div className={classes.buttons}>
                        <MyButton onClick={() => hideAnimatedModal(setModal)}>
                            EXCEL
                        </MyButton>
                        <MyButton onClick={() => hideAnimatedModal(setModal)}>
                            Закрыть
                        </MyButton>
                    </div>
                </div>
            )}
        </>
    );
}

ReadOrg.propTypes = {
    setModal: PropTypes.func.isRequired,
};
