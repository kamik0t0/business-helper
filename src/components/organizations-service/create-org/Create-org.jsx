import React, { useRef } from "react";
import classes from "./styles/create-org.module.css";
import Inputs from "./service/components/create-inputs.jsx";
import MySelect from "../../../UI/input/MySelect/MySelect.jsx";
import Buttons from "./service/components/create-buttons.jsx";
import { Organizaton } from "../../../utils/Org.js";
import { OrgFields } from "../../../utils/Org.js";
import { IpFields } from "../../../utils/Org.js";
import Loader from "../../../UI/Loader/Loader.jsx";
import { useDispatch } from "react-redux";
import { useCreateOrg } from "./service/hooks/useCreateOrg.js";
import { useSwitchOPF } from "./service/hooks/useSwitchOPF.js";
import { getRequisites } from "./service/handlers/getRequisites.js";
import { OPFoptions } from "./service/utils/options.js";

export default function CreateOrg() {
    const dispatch = useDispatch();

    const ORG = useRef(new Organizaton());

    const [isORG, getOPF] = useSwitchOPF(ORG.current);
    const [loader, create] = useCreateOrg(ORG.current);

    const getInputsValues = (event, field, length) =>
        getRequisites(event, field, length, ORG.current, isORG);
    const createOrg = (event) => dispatch(create(event));

    return (
        <>
            <div className={classes.create}>
                <div className={classes.name}>Введите реквизиты</div>
                <MySelect
                    name="Выберите ОПФ"
                    style={{ color: "#F0EBDD" }}
                    defaultValue={["Выберите организационно-правовую форму"][0]}
                    options={OPFoptions}
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
                <Buttons create={createOrg} />
            </div>
        </>
    );
}
