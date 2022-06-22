import { useRef } from "react";
import { OrgFields, IpFields } from "../../../../utils/Org";
import { isOrganization } from "../../../../utils/isOrg";
import { addRequisitesValues } from "../../handlers/addRequisitesValues";

export function useCounterparty(Counterparty) {
    const isORG = useRef(isOrganization(Counterparty));
    // добавляем значения к соответствующим реквизитам
    return (
        Counterparty !== null &&
        addRequisitesValues(OrgFields, IpFields, Counterparty, isORG.current)
    );
}
