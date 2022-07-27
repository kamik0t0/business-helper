import PropTypes from "prop-types";
import React from "react";
import MySelect from "../../../UI/input/MySelect/MySelect.jsx";
import Loader from "../../../UI/Loader/Loader.jsx";
import Buttons from "./service/components/create-buttons.jsx";
import CreateInputs from "./service/components/create-inputs.jsx";
import { useCreateOrg } from "./service/hooks/useCreateOrg";
import { useCreateRequisites } from "./service/hooks/useCreateRequisites";
import classes from "./styles/create-org.module.css";

const OPFoptions = [
    "Выберите организационно-правовую форму",
    "Общество с ограниченной ответственностью",
    "Индивидуальный предприниматель",
];

export const CreateContext = React.createContext();

export default function CreateOrg({
    UserId,
    OrgId = undefined,
    action,
    isLoading,
}) {
    const RequisitesAPI = useCreateRequisites(UserId, OrgId);
    const create = useCreateOrg(action, RequisitesAPI.ORG);

    const CreateFuncs = {
        getInputLengthLimit: RequisitesAPI.getInputLengthLimit,
        getInputValue: RequisitesAPI.getInputValue,
    };

    return (
        <>
            <div className={classes.create}>
                <div className={classes.name}>Введите реквизиты</div>
                <MySelect
                    name="Выберите ОПФ"
                    style={{ color: "#F0EBDD" }}
                    defaultValue={["Выберите организационно-правовую форму"][0]}
                    options={OPFoptions}
                    func={RequisitesAPI.getOPF}
                />
                {isLoading ? (
                    <Loader />
                ) : (
                    <CreateContext.Provider value={CreateFuncs}>
                        <CreateInputs
                            CreateFields={RequisitesAPI.CreateFields}
                            getRequisiteValue={RequisitesAPI.getRequisiteValue}
                        />
                    </CreateContext.Provider>
                )}
                <Buttons create={create} />
            </div>
        </>
    );
}

CreateOrg.propTypes = {
    UserId: PropTypes.number.isRequired,
    OrgId: PropTypes.number,
    action: PropTypes.func,
    isLoading: PropTypes.func,
};
