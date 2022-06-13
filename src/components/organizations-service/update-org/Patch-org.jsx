import React, { useRef, useContext } from "react";
import classes from "./styles/patch-org.module.css";
import MyButton from "../../../UI/input/MyButton/MyButton.jsx";
import { OrgFields } from "../../../utils/Org.js";
import { IpFields } from "../../../utils/Org.js";
import PatchField from "./service/components/Patch-field.jsx";
import Loader from "../../../UI/Loader/Loader.jsx";
import { useDispatch, useSelector } from "react-redux";
import { addRequisitesValues } from "../handlers/addRequisitesValues.js";
import { setValue } from "./service/handlers/set-value";
import { getValue } from "./service/handlers/get-value";
import { isOrganization } from "../../../utils/isOrg";
import { ModalContext } from "../../../blocks/content/Main.jsx";
import { modalManager } from "../../../UI/modal/service/handlers/modal-control.js";
import { MyOrg } from "../../../redux/setMyOrg-reducer.js";
import { usePatchOrg } from "./service/hooks/usePatchOrg.js";

export default function PatchOrg() {
    const dispatch = useDispatch();
    const MYORG = useSelector(MyOrg);

    const isORG = useRef(isOrganization(MYORG));
    const [loader, UpdateData, update] = usePatchOrg(MYORG);

    const { setModalUpdate } = useContext(ModalContext);
    const [, hideModal] = modalManager(setModalUpdate);

    // добавляем значения к соответствующим реквизитам
    const myOrg =
        MYORG !== null &&
        addRequisitesValues(OrgFields, IpFields, MYORG, isORG.current);

    const updateOrg = (event) => {
        dispatch(update(event));
    };
    const getInputValue = (event, field, length) =>
        getValue(event, field, length, UpdateData);
    const setInputValue = (event, field, length) =>
        setValue(event, field, length, UpdateData);

    return (
        <>
            {myOrg === null ? (
                <div className={classes.read}>
                    <div className={classes.noorg}>Организация не выбрана</div>
                </div>
            ) : (
                <div className={classes.read}>
                    <div className={classes.header}>Реквизиты</div>
                    {loader ? (
                        <Loader />
                    ) : (
                        myOrg.map((requisite, number) => {
                            return (
                                <PatchField
                                    key={requisite.field}
                                    number={number}
                                    requisite={requisite}
                                    getValue={getInputValue}
                                    setValue={setInputValue}
                                />
                            );
                        })
                    )}

                    <div className={classes.buttons}>
                        <MyButton onClick={updateOrg}>Обновить</MyButton>
                        <MyButton onClick={hideModal}>Закрыть</MyButton>
                    </div>
                </div>
            )}
        </>
    );
}
