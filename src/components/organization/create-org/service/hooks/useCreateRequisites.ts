import React, { useState } from "react";
import { ICounterparty } from "../../../../../interfaces/counterparty";
import { IRequisiteView } from "../../../../../interfaces/requisite";
import { Organizaton } from "../../../../../utils/OrganizationClass";
import {
    IEFieldsFactory,
    OrgFieldsFactory,
} from "../../../../../utils/TextFieldsClass";
import { InputValueHandler } from "../../../update-org/service/handlers/InputValueHandler";

export function useCreateRequisites(UserId: number, OrgId: number | null) {
    const [isORG, setIsOrg] = useState(true);
    const [orgReqs, setOrgReqs] = useState(new Organizaton(UserId, OrgId));
    const [index, setIndex] = useState(-1);

    const CreateFields: IRequisiteView[] = isORG
        ? new OrgFieldsFactory().createFields(
              orgReqs.orgname,
              orgReqs.inn,
              orgReqs.kpp,
              orgReqs.address,
              orgReqs.director
          )
        : new IEFieldsFactory().createFields(
              orgReqs.orgname,
              orgReqs.inn,
              orgReqs.address
          );

    if (index > -1 && CreateFields.length > index)
        CreateFields[index].focus = true;

    const updateProperty = (
        field: string,
        value: string | number | boolean
    ): void =>
        setOrgReqs((orgReqs: ICounterparty): any => ({
            ...orgReqs,
            [field]: value,
        }));

    const switchInputFields = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value === "Общество с ограниченной ответственностью")
            setIsOrg(true);
        else setIsOrg(false);
    };

    const updateOPFProperty = (event: React.ChangeEvent<HTMLSelectElement>) =>
        updateProperty("opf", event.target.value);

    const getInputValue = (
        event: React.ChangeEvent<HTMLInputElement>,
        inputField: string,
        inputFieldLength?: number
    ) => InputValueHandler(event, inputField, updateProperty, inputFieldLength);

    const getInputIndex = (index: number) => setIndex(index);

    return {
        CreateFields,
        switchInputFields,
        orgReqs,
        updateOPFProperty,
        getInputValue,
        getInputIndex,
    };
}
