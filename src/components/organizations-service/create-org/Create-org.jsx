import React, { useState, useRef } from "react";
import classes from "./styles/create-org.module.css";
import Inputs from "./service/components/create-inputs.jsx";
import MySelect from "../../../UI/input/MySelect/MySelect.jsx";
import Buttons from "./service/components/create-buttons.jsx";
import { Organizaton } from "../../../utils/Org.js";
import { Requisites } from "../../../utils/Org.js";
import { clear } from "../../../utils/clear.js";
import Loader from "../../../UI/Loader/Loader.jsx";
import { useDispatch } from "react-redux";
import { create } from "./service/handlers/create.js";
import { switchOPF } from "./service/handlers/switchOPF.js";
import { getRequisites } from "./service/handlers/getRequisites.js";
import PropTypes from "prop-types";

export default function CreateOrg({ setModal, setOrgs, url, idName }) {
    const [isORG, setIsOrg] = useState(true);
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();

    const ORG = useRef(new Organizaton());
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
                    func={(event) => switchOPF(event, setIsOrg, ORG.current)}
                />
                {loader ? (
                    <Loader />
                ) : (
                    <Inputs
                        isORG={isORG}
                        fields={Requisites}
                        getValue={(event, field, length) =>
                            getRequisites(
                                event,
                                field,
                                length,
                                ORG.current,
                                isORG
                            )
                        }
                    />
                )}

                <Buttons
                    create={(event) =>
                        create(
                            event,
                            ORG.current,
                            setLoader,
                            setOrgs,
                            url,
                            dispatch,
                            setModal,
                            idName
                        )
                    }
                    clear={clear}
                    setModal={setModal}
                />
            </div>
        </>
    );
}

CreateOrg.propTypes = {
    setModal: PropTypes.func.isRequired,
    setOrgs: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
    idName: PropTypes.string.isRequired,
};
