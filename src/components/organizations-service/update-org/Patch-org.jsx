import React, { useRef, useState, useContext } from "react";
import classes from "./styles/patch-org.module.css";
import MyButton from "../../../UI/input/MyButton/MyButton.jsx";
import { OrgFields } from "../../../utils/Org.js";
import { IpFields } from "../../../utils/Org.js";
import { Organizaton } from "../../../utils/Org.js";
import PatchFields from "./service/components/Patch-fields.jsx";
import Loader from "../../../UI/Loader/Loader.jsx";
import { useDispatch, useSelector } from "react-redux";
import { addRequisitesValues } from "../handlers/addRequisitesValues.js";
import { setValue } from "./service/handlers/set-value";
import { getValue } from "./service/handlers/get-value";
import { update } from "./service/handlers/update.js";
import { filterRequisites } from "../handlers/filter-requisites.js";
import { isOrganization } from "../../../utils/isOrg";
import { ModalContext } from "../../../blocks/content/Main.jsx";
import { modalManager } from "../../../UI/modal/service/handlers/modal-control.js";

export default function PatchOrg() {
    const [loader, setLoader] = useState(false);
    const MYORG = useSelector((state) => state.setMyOrgReducer.myOrg);
    const isORG = useRef();
    const { setModalUpdate } = useContext(ModalContext);
    const [, hideModal] = modalManager(setModalUpdate);
    isORG.current = isOrganization(MYORG);
    const dispatch = useDispatch();
    // объект с обновленными значениями
    const Updated = useRef(new Organizaton());
    // добавляем значения к соответствующим реквизитам
    const myOrg =
        MYORG !== null &&
        addRequisitesValues(OrgFields, IpFields, MYORG, isORG);
    // фильтрация полей если изменяется на ИП
    const filtered = MYORG !== null && filterRequisites(myOrg, isORG);

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
                        filtered.map((requisite, number) => {
                            return (
                                <PatchFields
                                    key={requisite.field}
                                    number={number}
                                    requisite={requisite}
                                    getValue={(event, field, length) =>
                                        getValue(event, field, length, Updated)
                                    }
                                    setValue={(event, field, length) =>
                                        setValue(event, field, length, Updated)
                                    }
                                />
                            );
                        })
                    )}

                    <div className={classes.buttons}>
                        <MyButton
                            onClick={(event) => {
                                dispatch(
                                    update(
                                        event,
                                        Updated.current,
                                        () => setLoader(!loader),
                                        MYORG
                                    )
                                );
                                hideModal();
                            }}
                        >
                            Обновить
                        </MyButton>
                        <MyButton onClick={hideModal}>Закрыть</MyButton>
                    </div>
                </div>
            )}
        </>
    );
}
