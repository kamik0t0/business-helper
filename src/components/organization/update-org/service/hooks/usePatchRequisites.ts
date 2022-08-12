import { useState } from "react";
import { ICounterparty } from "../../../../../interfaces/counterparty";
import { IRequisiteView } from "../../../../../interfaces/requisite";
import { isOrganization } from "../../../../../utils/isOrganization";
import { Organizaton } from "../../../../../utils/OrganizationClass";
import { assignRequisitesValues } from "../../../common/scripts/assignRequisitesValues";

export function usePatchRequisites(org: ICounterparty) {
    const isORG = isOrganization(org);
    const [newOrgReqs, setNewOrgReqs] = useState(
        new Organizaton(
            org.UserId,
            org.OrgId,
            org.id,
            org.createdAt,
            org.inn,
            org.opf,
            org.orgname,
            org.address,
            org.kpp,
            org.director
        )
    );

    const updateProperty = (
        field: string,
        value: string | number | boolean
    ): void =>
        setNewOrgReqs((newOrgReqs: ICounterparty): any => ({
            ...newOrgReqs,
            [field]: value,
        }));

    const getInputValue = (value: string, inputField: string, length: number) =>
        updateProperty(inputField, value);

    const PatchFields: IRequisiteView[] | null | boolean =
        org !== null && assignRequisitesValues(newOrgReqs, isORG);

    return {
        getInputValue,
        PatchFields,
        newOrgReqs,
    };
}
