import React, { useState, useRef, useContext } from "react";
import classes from "./styles/create-org.module.css";
import Inputs from "./service/components/create-inputs.jsx";
import MySelect from "../../../UI/input/MySelect/MySelect.jsx";
import Buttons from "./service/components/create-buttons.jsx";
import { Organizaton } from "../../../utils/Org.js";
import { OrgFields } from "../../../utils/Org.js";
import { IpFields } from "../../../utils/Org.js";
import { clear } from "../../../utils/clear.ts";
import Loader from "../../../UI/Loader/Loader.jsx";
import { useDispatch } from "react-redux";
import { create } from "./service/handlers/create-counterparty";
import { switchOPF } from "./service/handlers/switchOPF.js";
import { getRequisites } from "./service/handlers/getRequisites.js";
import { ModalContext } from "../../../blocks/content/Main.jsx";
import { modalManager } from "../../../UI/modal/service/handlers/modal-control.js";

export default function CreateCounterparty() {
    const [isORG, setIsOrg] = useState(true);
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    const { setModalAdd } = useContext(ModalContext);
    const [, hideModal] = modalManager(setModalAdd);

    const COUNTERPARTY = useRef(new Organizaton());
    return (
        <>
            <div className={classes.create}>
                <div className={classes.name}>Введите реквизиты</div>
                <MySelect
                    name="Выберите ОПФ"
                    style={{ color: "#F0EBDD" }}
                    defaultValue={["Выберите организационно-правовую форму"][0]}
                    options={[
                        "Выберите организационно-правовую форму",
                        "Общество с ограниченной ответственностью",
                        "Индивидуальный предприниматель",
                    ]}
                    func={(event) =>
                        switchOPF(event, setIsOrg, COUNTERPARTY.current)
                    }
                />
                {loader ? (
                    <Loader />
                ) : (
                    <Inputs
                        isORG={isORG}
                        fields={isORG ? OrgFields : IpFields}
                        getValue={(event, field, length) =>
                            getRequisites(
                                event,
                                field,
                                length,
                                COUNTERPARTY.current,
                                isORG
                            )
                        }
                    />
                )}

                <Buttons
                    create={(event) => {
                        dispatch(
                            create(event, COUNTERPARTY.current, () =>
                                setLoader(!loader)
                            )
                        );
                        hideModal();
                    }}
                    clear={clear}
                />
            </div>
        </>
    );
}
