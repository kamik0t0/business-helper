import React, { useRef } from "react";
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
import { getRequisites } from "./service/handlers/getRequisites.js";
import { useSwitchOPF } from "../../common/hooks/useSwitchOPF";
import { useCreateCounterparty } from "./service/hooks/useCreateCounterparty";

export default function CreateCounterparty() {
    const dispatch = useDispatch();
    const COUNTERPARTY = useRef(new Organizaton());

    const [loader, create] = useCreateCounterparty(COUNTERPARTY.current);
    const [isORG, getOPF] = useSwitchOPF(COUNTERPARTY.current);

    const getInputsValues = (event, field, length) =>
        getRequisites(event, field, length, COUNTERPARTY.current, isORG);

    const dispatchCreateCounterparty = (event) => {
        dispatch(create(event));
    };
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
                    func={getOPF}
                />
                {loader ? (
                    <Loader />
                ) : (
                    <Inputs
                        isORG={isORG}
                        fields={isORG ? OrgFields : IpFields}
                        getValue={getInputsValues}
                    />
                )}

                <Buttons create={dispatchCreateCounterparty} clear={clear} />
            </div>
        </>
    );
}
