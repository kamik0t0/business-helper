import { ICounterparty } from "../../../../interfaces/counterparty";
import { IRequisiteView } from "../../../../interfaces/requisite";
import {
    OrgFieldsFactory,
    IEFieldsFactory,
} from "../../../../utils/TextFieldsClass";

// создается массив с реквизитами обновляемой организации
export function assignRequisitesValues(
    org: ICounterparty | null,
    isORG: boolean
): IRequisiteView[] | null {
    if (org === null) return null;
    if (isORG) {
        const OrgFields = new OrgFieldsFactory();
        const OrgFieldsArr = OrgFields.createFields(
            org.orgname,
            org.inn,
            org?.kpp || null,
            org.address,
            org?.director || null
        );
        for (const requisite of OrgFieldsArr) {
            requisite.value = org[requisite.inputField];
        }
        return OrgFieldsArr;
    } else {
        const IpFields = new IEFieldsFactory();
        const IpFieldsArr = IpFields.createFields(
            org.orgname,
            org.inn,
            org.address
        );
        for (const requisite of IpFieldsArr) {
            requisite.value = org[requisite.inputField];
        }
        return IpFieldsArr;
    }
}
