import { SetStateAction, useState } from "react";
import { ICounterparty } from "../../../../../interfaces/counterparty";
import { IRequisiteView } from "../../../../../interfaces/requisite";
import { isOrganization } from "../../../../../utils/isOrganization";
import { Organizaton } from "../../../../../utils/OrganizationClass";
import { assignRequisitesValues } from "../../../common/scripts/assignRequisitesValues";

export function usePatchRequisites(org: ICounterparty | null) {
    const isORG = isOrganization(org);
    const [newOrgReqs, setNewOrgReqs] = useState<ICounterparty | null>(
        org &&
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
        value: string | number | boolean | null | undefined
    ): void =>
        setNewOrgReqs(
            (newOrgReqs: SetStateAction<ICounterparty | null>): any => ({
                ...newOrgReqs,
                [field]: value,
            })
        );

    const getInputValue = (
        value: string | number | boolean | null | undefined,
        inputField: string
    ) => updateProperty(inputField, value);

    const PatchFields: IRequisiteView[] | null | boolean =
        org !== null && assignRequisitesValues(newOrgReqs, isORG);

    return {
        getInputValue,
        PatchFields,
        newOrgReqs,
    };
}
