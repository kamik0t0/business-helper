import { OrgFields, IpFields } from "../../../utils/Org";

export function addRequisitesValues(USERORG = null, isORG) {
    if (USERORG === null) return null;
    if (isORG) {
        for (const requisiteName of OrgFields) {
            requisiteName.value = USERORG[requisiteName.field];
        }
        return OrgFields;
    } else {
        for (const requisiteName of IpFields) {
            requisiteName.value = USERORG[requisiteName.field];
        }
        return IpFields;
    }
}
