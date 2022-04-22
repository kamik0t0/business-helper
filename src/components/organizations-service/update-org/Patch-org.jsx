import React, { useRef, useState } from "react";
import classes from "./styles/patch-org.module.css";
import MyButton from "../../../UI/input/MyButton/MyButton.jsx";
import { OrgFields } from "../../../utils/Org.js";
import { IpFields } from "../../../utils/Org.js";
import { Organizaton } from "../../../utils/Org.js";
import PatchFields from "./service/components/Patch-fields.jsx";
import Loader from "../../../UI/Loader/Loader.jsx";
import { useDispatch, useSelector } from "react-redux";
import { hideAnimatedModal } from "../../../UI/modal/service/handlers/modal-control.js";
import { addRequisitesValues } from "../handlers/addRequisitesValues.js";
import { setValue } from "./service/handlers/set-value";
import { getValue } from "./service/handlers/get-value";
import { update } from "./service/handlers/update.js";
import { filterRequisites } from "../handlers/filter-requisites.js";
import { isOrganization } from "../../../utils/isOrg";
import PropTypes from "prop-types";

export default function PatchOrg({ setModal }) {
    const [loader, setLoader] = useState(false);
    const MYORG = useSelector((state) => state.setMyOrgReducer.myOrg);
    const isORG = useRef();
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
                                    length={requisite.lngth}
                                    isNumber={requisite.num}
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
                            onClick={async (event) => {
                                const [ORGS, UpOrg] = await update(
                                    event,
                                    Updated.current,
                                    () => setLoader(!loader),
                                    setModal,
                                    MYORG,
                                    () =>
                                        dispatch({
                                            type: "REG_FALSE",
                                            payload: false,
                                        }),
                                    () =>
                                        dispatch({
                                            type: "isERROR_TRUE",
                                            payload: true,
                                            message: "No connection to server",
                                        })
                                );
                                dispatch({
                                    type: "ORGS",
                                    payload: ORGS,
                                });
                                dispatch({
                                    type: "MYORG",
                                    payload: UpOrg,
                                });
                            }}
                        >
                            Обновить
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

PatchOrg.propTypes = {
    setModal: PropTypes.func.isRequired,
};
