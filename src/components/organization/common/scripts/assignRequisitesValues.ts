import { OrgFields, IpFields } from "../../../../utils/OrganizationClass";
import { ICounterparty } from "../../../../interfaces/counterparty";

// создается массив с реквизитами обновляемой организации
export function assignRequisitesValues(ORG: ICounterparty, isORG: boolean) {
    if (ORG === null) return null;
    if (isORG) {
        for (const requisite of OrgFields) {
            requisite.value = ORG[requisite.inputField];
        }
        return OrgFields;
    } else {
        for (const requisite of IpFields) {
            requisite.value = ORG[requisite.inputField];
        }
        return IpFields;
    }
}
