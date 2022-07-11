import { OrgFields, IpFields } from "../../../../utils/Org";

// создается массив с реквизитами обновляемой организации
export function assignRequisitesValues(ORG = null, isORG) {
    if (ORG === null) return null;
    if (isORG) {
        for (const requisiteName of OrgFields) {
            requisiteName.value = ORG[requisiteName.field];
        }
        return OrgFields;
    } else {
        for (const requisiteName of IpFields) {
            requisiteName.value = ORG[requisiteName.field];
        }
        return IpFields;
    }
}
