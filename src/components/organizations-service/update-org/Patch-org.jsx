import React, { useRef, useState } from "react";
import classes from "./styles/patch-org.module.css";
import MyButton from "../../../UI/input/MyButton/MyButton.jsx";
import { Requisites } from "../../../utils/Org.js";
import { Organizaton } from "../../../utils/Org.js";
import PatchFields from "./service/components/Patch-fields.jsx";
import Loader from "../../../UI/Loader/Loader.jsx";
import { useDispatch } from "react-redux";
import { hideAnimatedModal } from "../../../UI/modal/service/handlers/modal-control.js";
import { addRequisitesValues } from "../handlers/addRequisitesValues.js";
import { setValue } from "./service/handlers/set-value";
import { getValue } from "./service/handlers/get-value";
import { update } from "./service/handlers/update.js";
import { filterRequisites } from "../handlers/filter-requisites.js";

export default function PatchOrg({
    setModal,
    org,
    setActiveOrg,
    type,
    url,
    noselected,
    isORG,
}) {
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    // объект с обновленными значениями
    const Updated = useRef(new Organizaton());
    // добавляем значения к соответствующим полям
    const myOrg = org !== null && addRequisitesValues(Requisites, org);
    // фильтрация полей если изменяется ИП
    const filtered = org !== null && filterRequisites(myOrg, isORG);

    return (
        <>
            {org === null ? (
                <div className={classes.read}>
                    <div className={classes.noorg}>{noselected}</div>
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
                        {" "}
                        <MyButton
                            onClick={(event) =>
                                update(
                                    event,
                                    url,
                                    Updated.current,
                                    setLoader,
                                    setModal,
                                    type,
                                    org,
                                    setActiveOrg,
                                    dispatch
                                )
                            }
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
