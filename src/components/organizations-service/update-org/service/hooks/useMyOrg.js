import { useRef } from "react";
import { OrgFields, IpFields } from "../../../../../utils/Org";
import { isOrganization } from "../../../../../utils/isOrg";
import { addRequisitesValues } from "../../../handlers/addRequisitesValues";

export function useMyOrg(Org) {
    const isORG = useRef(isOrganization(Org));
    // добавляем значения к соответствующим реквизитам
    return (
        Org !== null &&
        addRequisitesValues(OrgFields, IpFields, Org, isORG.current)
    );
}
