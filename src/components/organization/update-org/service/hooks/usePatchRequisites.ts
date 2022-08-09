import { useRef, MutableRefObject } from "react";
import { ICounterpartyWithInputValueLength } from "../../../../../interfaces/counterparty";
import { IEvent } from "../../../../../interfaces/event";
import { IRequisiteView } from "../../../../../interfaces/requisite";
import { isOrganization } from "../../../../../utils/isOrganization";
import { Organizaton } from "../../../../../utils/OrganizationClass";
import { assignRequisitesValues } from "../../../common/scripts/assignRequisitesValues";
import { setUpdateOrgValue } from "../handlers/InputValueHandler";

interface IusePatchRequisites {
    getUpdateValue: (
        event: IEvent,
        inputField: string,
        newValue: string
    ) => boolean;
    PatchFields: IRequisiteView[] | null | boolean;
    UpdateData: MutableRefObject<ICounterpartyWithInputValueLength | null>;
}

export function usePatchRequisites(
    org: ICounterpartyWithInputValueLength
): IusePatchRequisites {
    const UpdatedOrg =
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
        );
    const UpdateData = useRef(UpdatedOrg);
    const isORG = useRef(isOrganization(org));

    const getUpdateValue = (
        _event: IEvent,
        newValue: string,
        inputField: string
    ) => setUpdateOrgValue(newValue, inputField, UpdateData);

    const PatchFields: IRequisiteView[] | null | boolean =
        org !== null && assignRequisitesValues(org, isORG.current);

    return {
        getUpdateValue,
        PatchFields,
        UpdateData,
    };
}
