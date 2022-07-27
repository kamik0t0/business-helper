import { useState, useRef } from "react";
import {
    OrgFields,
    IpFields,
    Organizaton,
} from "../../../../../utils/OrganizationClass";
import { setInputLengthLimit } from "../../../update-org/service/handlers/setInputLengthLimit";
import { setInputValue } from "../../../update-org/service/handlers/setUpdateOrgValue";
import { IEvent } from "../../../../../interfaces/event";
import { ICounterpartyWithInputValueLength } from "../../../../../interfaces/counterparty";
import { MutableRefObject } from "react";
import { IRequisiteView } from "../../../../../interfaces/requisite";

export function useCreateRequisites(UserId: number, OrgId: number | undefined) {
    const [isORG, setIsOrg] = useState(true);
    const ORG: MutableRefObject<ICounterpartyWithInputValueLength> = useRef(
        new Organizaton(
            undefined,
            undefined,
            UserId,
            OrgId,
            null,
            null,
            null,
            null,
            null,
            null
        )
    );

    function getOPF(event: IEvent) {
        if (event.target.value === "Общество с ограниченной ответственностью") {
            setIsOrg(true);
            ORG.current.opf = "Общество с ограниченной ответственностью";
        } else {
            setIsOrg(false);
            ORG.current.opf = "Индивидуальный предприниматель";
            delete ORG.current?.kpp;
            delete ORG.current?.director;
        }
    }

    const getInputLengthLimit = (length: number) =>
        setInputLengthLimit(length, ORG);

    const getInputValue = (event: IEvent, inputField: string) =>
        setInputValue(event, inputField, ORG);

    const CreateFields: IRequisiteView[] = isORG ? OrgFields : IpFields;

    return { CreateFields, getOPF, getInputLengthLimit, getInputValue, ORG };
}
