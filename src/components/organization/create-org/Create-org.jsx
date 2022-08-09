import PropTypes from "prop-types";
import React, { memo } from "react";
import Select from "../../../UI/input/Select/Select.jsx";
import Loader from "../../../UI/Loader/Loader.jsx";
import Buttons from "./service/components/RequisiteInputField.jsx";
import RequisiteInputFields from "./service/components/RequisiteInputFields.jsx";
import { useCreateOrg } from "./service/hooks/useCreateOrg";
import { useCreateRequisites } from "./service/hooks/useCreateRequisites";
import classes from "./styles/create-org.module.css";

export const TextFieldContext = React.createContext();

const OPFoptions = [
    "Выберите организационно-правовую форму",
    "Общество с ограниченной ответственностью",
    "Индивидуальный предприниматель",
];

const CreateOrg = memo(({ UserId, OrgId = null, action, isLoading }) => {
    const RequisitesAPI = useCreateRequisites(UserId, OrgId);
    const create = useCreateOrg(
        action,
        RequisitesAPI.orgReqs,
        RequisitesAPI.CreateFields
    );

    return (
        <>
            <div className={classes.create}>
                <div className={classes.name}>Введите реквизиты</div>
                <Select
                    name="Выберите ОПФ"
                    style={{ color: "#F0EBDD" }}
                    defaultValue={["Выберите организационно-правовую форму"][0]}
                    options={OPFoptions}
                    onInput={RequisitesAPI.updateOPFProperty}
                    onChange={RequisitesAPI.switchInputFields}
                />
                {isLoading ? (
                    <Loader />
                ) : (
                    <TextFieldContext.Provider
                        value={{
                            getInputValue: RequisitesAPI.getInputValue,
                            getInputIndex: RequisitesAPI.getInputIndex,
                        }}
                    >
                        <RequisiteInputFields
                            RequisiteInputFields={RequisitesAPI.CreateFields}
                        />
                    </TextFieldContext.Provider>
                )}
                <Buttons create={create} />
            </div>
        </>
    );
});

export default CreateOrg;

CreateOrg.propTypes = {
    UserId: PropTypes.number.isRequired,
    OrgId: PropTypes.number,
    action: PropTypes.func,
    isLoading: PropTypes.bool,
};
