import { useState } from "react";

// выбор организационно-правовой формы - добавляем/удаляем поля для ввода реквизитов
export function useSwitchOPF(ORG) {
    const [isORG, setIsOrg] = useState(true);

    function getOPF(event) {
        {
            if (
                event.target.value ===
                "Общество с ограниченной ответственностью"
            ) {
                setIsOrg(true);
                ORG.opf = "Общество с ограниченной ответственностью";
                ORG["kpp"] = undefined;
                ORG["director"] = undefined;
            } else {
                setIsOrg(false);
                ORG.opf = "Индивидуальный предприниматель";
                delete ORG["kpp"];
                delete ORG["director"];
            }
        }
    }
    return [isORG, getOPF];
}
