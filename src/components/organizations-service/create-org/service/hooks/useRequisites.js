import { useState, useRef } from "react";
import { useTypedSelector } from "../../../../../redux/hooks/hooks";
import { Organizaton, OrgFields, IpFields } from "../../../../../utils/Org";
import { getRequisites } from "../handlers/getRequisites";

// выбор организационно-правовой формы - добавляем/удаляем поля для ввода реквизитов
export function useRequisites() {
    const [isORG, setIsOrg] = useState(true);
    const ORG = useRef(new Organizaton());
    const UserId = useTypedSelector((state) => state.userReducer.data.id);
    ORG.current["UserId"] = UserId;
    ORG.current.OrgId = "noId";

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

    return [fields, getOPF, getInputsValues, ORG];
}
