import React from "react";
import classes from "./styles/read-org.module.css";
import { Requisites } from "../../../utils/Org.js";
import MyButton from "../../../UI/input/MyButton/MyButton.jsx";
import { hideAnimatedModal } from "../../../UI/modal/service/handlers/modal-control.js";
import { addRequisitesValues } from "../handlers/addRequisitesValues.js";
import Requisite from "./service/components/ReqField.jsx";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";

export default function ReadOrg({ setModal, org, noselected }) {
    // если выбрана организация, то добавляются значения реквизитов
    let propsSet = addRequisitesValues(Requisites, org);
    console.log(propsSet);

    return (
        <>
            {/* если параметр организации = null (т.е. отсутствует в localStorage), то компонент не рендерится */}
            {propsSet === null ? (
                <div className={classes.read}>
                    <div className={classes.noorg}>{noselected}</div>
                </div>
            ) : (
                <div className={classes.read}>
                    <div className={classes.header}>Реквизиты</div>
                    {propsSet.map((requisite) => {
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
    org: PropTypes.object.isRequired,
    noselected: PropTypes.string,
};
