import { useRef, MutableRefObject } from "react";
import { ICounterpartyWithInputValueLength } from "../../../../../interfaces/counterparty";
import { IEvent } from "../../../../../interfaces/event";
import { IRequisiteView } from "../../../../../interfaces/requisite";

import { isOrganization } from "../../../../../utils/isOrganization";
import { Organizaton } from "../../../../../utils/OrganizationClass";
import { assignRequisitesValues } from "../../../common/scripts/assignRequisitesValues";
import { setInputLengthLimit } from "../handlers/setInputLengthLimit";
import { setUpdateOrgValue } from "../handlers/setUpdateOrgValue";

interface IusePatchRequisites {
    getInputLengthLimit: (length: number) => void;
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
    const UpdatedOrg: ICounterpartyWithInputValueLength | null =
        org &&
        new Organizaton(
            org.id,
            org.createdAt,
            org.UserId,
            org?.OrgId,
            org.inn,
            org.opf,
            org.orgname,
            org.address,
            org.kpp,
            org.director
        );
    const UpdateData = useRef(UpdatedOrg);
    const isORG = useRef(isOrganization(org));

    const getInputLengthLimit = (length: number) =>
        setInputLengthLimit(length, UpdateData);

    const getUpdateValue = (
        _event: IEvent,
        newValue: string,
        inputField: string
    ) => setUpdateOrgValue(newValue, inputField, UpdateData);

    const PatchFields: IRequisiteView[] | null | boolean =
        org !== null && assignRequisitesValues(org, isORG.current);

    return {
        getInputLengthLimit,
        getUpdateValue,
        PatchFields,
        UpdateData,
    };
}
