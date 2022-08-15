import React, { memo } from "react";
import Select from "../../../UI/input/Select/Select";
import Loader from "../../../UI/Loader/Loader";
import Buttons from "./service/components/RequisiteInputField";
import RequisiteInputFields from "./service/components/RequisiteInputFields";
import { useCreateOrg } from "./service/hooks/useCreateOrg";
import { useCreateRequisites } from "./service/hooks/useCreateRequisites";
import classes from "./styles/create-org.module.css";

export const TextFieldContext = React.createContext<{
    getInputValue: (
        event: React.ChangeEvent<HTMLInputElement>,
        inputField: string,
        inputFieldLength?: number
    ) => void;
    getInputIndex: (index: number) => void;
} | null>(null);

const OPFoptions = [
    "Выберите организационно-правовую форму",
    "Общество с ограниченной ответственностью",
    "Индивидуальный предприниматель",
];

type CreateOrgTypes = {
    UserId: number;
    OrgId: number | null;
    action: any;
    isLoading: boolean;
};

const CreateOrg: React.FC<CreateOrgTypes> = memo(
    ({ UserId, OrgId = null, action, isLoading }) => {
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
                                RequisiteInputFields={
                                    RequisitesAPI.CreateFields
                                }
                            />
                        </TextFieldContext.Provider>
                    )}
                    <Buttons create={create} />
                </div>
            </>
        );
    }
);

export default CreateOrg;
