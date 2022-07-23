import { useState, useRef } from "react";
import {
    OrgFields,
    IpFields,
    Organizaton,
} from "../../../../../utils/OrganizationClass";
import { setInputLengthLimit } from "../../../update-org/service/handlers/setInputLengthLimit";
import { setInputValue } from "../../../update-org/service/handlers/setUpdateOrgValue";

export function useCreateRequisites(UserId, OrgId) {
    const [isORG, setIsOrg] = useState(true);
    const ORG = useRef(new Organizaton(undefined, undefined, UserId, OrgId));

    function getOPF(event) {
        if (event.target.value === "Общество с ограниченной ответственностью") {
            setIsOrg(true);
            ORG.current.opf = "Общество с ограниченной ответственностью";
        } else {
            setIsOrg(false);
            ORG.current.opf = "Индивидуальный предприниматель";
            delete ORG.current["kpp"];
            delete ORG.current["director"];
        }
    }

    const getInputLengthLimit = (length) => setInputLengthLimit(length, ORG);

    const getInputValue = (event, inputField) =>
        setInputValue(event, inputField, ORG);

    const CreateFields = isORG ? OrgFields : IpFields;

    return { CreateFields, getOPF, getInputLengthLimit, getInputValue, ORG };
}
