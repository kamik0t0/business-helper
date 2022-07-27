import { ICounterparty } from "../../../../interfaces/counterparty";
import { IRequisiteView } from "../../../../interfaces/requisite";
import { IpFields, OrgFields } from "../../../../utils/OrganizationClass";

// создается массив с реквизитами обновляемой организации
export function assignRequisitesValues(
    org: ICounterparty,
    isORG: boolean
): IRequisiteView[] | null {
    if (org === null) return null;
    if (isORG) {
        for (const requisite of OrgFields) {
            requisite.value = org[requisite.inputField];
        }
        return OrgFields;
    } else {
        for (const requisite of IpFields) {
            requisite.value = org[requisite.inputField];
        }
        return IpFields;
    }
}
