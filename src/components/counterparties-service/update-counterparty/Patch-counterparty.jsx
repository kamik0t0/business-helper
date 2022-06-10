import React, { useRef, useState, useContext } from "react";
import classes from "./styles/patch-org.module.css";
import MyButton from "../../../UI/input/MyButton/MyButton.jsx";
import { OrgFields } from "../../../utils/Org.js";
import { IpFields } from "../../../utils/Org.js";
import { Organizaton } from "../../../utils/Org.js";
import PatchFields from "../../../components/organizations-service/update-org/service/components/Patch-fields.jsx";
// import PatchFields from "./service/components/Patch-fields.jsx";
import Loader from "../../../UI/Loader/Loader.jsx";
import { useDispatch, useSelector } from "react-redux";
import { addRequisitesValues } from "../handlers/addRequisitesValues.js";
import { setValue } from "./service/handlers/set-value";
import { getValue } from "./service/handlers/get-value";
import { update } from "./service/handlers/update.js";
import { filterRequisites } from "../handlers/filter-requisites.js";
import { isOrganization } from "../../../utils/isOrg";
import { v4 as uuid } from "uuid";
import { ModalContext } from "../../../blocks/content/Main.jsx";
import { modalManager } from "../../../UI/modal/service/handlers/modal-control.js";

export default function PatchCounterparty() {
    const [loader, setLoader] = useState(false);
    const COUNTERPARTY = useSelector(
        (state) => state.setCounterpartyReducer.counterparty
    );
    const isORG = useRef();
    const dispatch = useDispatch();
    const Updated = useRef(new Organizaton());
    const { setModalUpdate } = useContext(ModalContext);
    const [, hideModal] = modalManager(setModalUpdate);

    isORG.current = isOrganization(COUNTERPARTY);
    // объект с обновленными значениями
    // добавляем значения к соответствующим реквизитам
    const fields =
        COUNTERPARTY !== null &&
        addRequisitesValues(OrgFields, IpFields, COUNTERPARTY, isORG.current);

    const filteredFields = filterRequisites(fields, isORG.current);
    return (
        <>
            {COUNTERPARTY === null ? (
                <div className={classes.read}>
                    <div className={classes.noorg}>Организация не выбрана</div>
                </div>
            ) : (
                <div className={classes.read}>
                    <div className={classes.header}>Реквизиты</div>
                    {loader ? (
                        <Loader />
                    ) : (
                        filteredFields.map((requisite, number) => {
                            return (
                                <PatchFields
                                    key={uuid()}
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
                                        COUNTERPARTY
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
