import { useState } from "react";
import { OrgFields, IpFields } from "../../../../utils/Org";
import { getRequisites } from "../scripts/getRequisites";

// выбор организационно-правовой формы - добавляем/удаляем поля для ввода реквизитов
export function useRequisites(ORG) {
    const [isORG, setIsOrg] = useState(true);
    function getOPF(event) {
        {
            if (
                event.target.value ===
                "Общество с ограниченной ответственностью"
            ) {
                setIsOrg(true);
                ORG.current.opf = "Общество с ограниченной ответственностью";
                ORG.current["kpp"] = undefined;
                ORG.current["director"] = undefined;
            } else {
                setIsOrg(false);
                ORG.current.opf = "Индивидуальный предприниматель";
                delete ORG.current["kpp"];
                delete ORG.current["director"];
            }
        }
    }

    const getInputsValues = (event, field, length) =>
        getRequisites(event, field, length, ORG, isORG);

    const fields = isORG ? OrgFields : IpFields;

    return [fields, getOPF, getInputsValues];
}
