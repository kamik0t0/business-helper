import React from "react";
import classes from "./styles/read-org.module.css";
import { Requisites } from "../../../utils/Org.js";
import MyButton from "../../../UI/input/MyButton/MyButton.jsx";
import { hideAnimatedModal } from "../../../UI/modal/service/handlers/modal-control.js";
import { addRequisitesValues } from "../handlers/addRequisitesValues.js";

export default function ReadOrg({ setModal, org, noselected }) {
    // если выбрана организация, то добавляются значения реквизитов
    let myOrg = org !== null && addRequisitesValues(Requisites, org);

    return (
        <>
            {/* если параметр организации = null (т.е. отсутствует в localStorage), то компонент не рендерится */}
            {org === null ? (
                <div className={classes.read}>
                    <div className={classes.noorg}>{noselected}</div>
                </div>
            ) : (
                <div className={classes.read}>
                    <div className={classes.header}>Реквизиты</div>

                    {myOrg.map((requisite) => {
                        return (
                            <>
                                {requisite.value !== "null" && (
                                    <div
                                        key={requisite.field}
                                        className={classes.content}
                                    >
                                        <div className={classes.requisit_name}>
                                            {requisite.name}
                                        </div>
                                        <div className={classes.requisit_value}>
                                            {requisite.value}
                                        </div>
                                    </div>
                                )}
                            </>
                        );
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
