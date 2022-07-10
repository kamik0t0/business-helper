// получение реквизитов + контроль ИНН и КПП. Надо сделать декомпозицию.
export function getRequisites(event, field, length, ORG, isORG) {
    if (isORG) {
        if (field in ORG.current)
            ORG.current[field] = event.target.value.trim();
        ORG.current["kppLength"] =
            length !== undefined && field === "kpp"
                ? length
                : ORG.current["kppLength"];
        ORG.current["innLength"] =
            length !== undefined && field === "inn"
                ? length
                : ORG.current["innLength"];
    } else {
        if (field in ORG.current)
            ORG.current[field] = event.target.value.trim();
        ORG.current["innLength"] =
            length !== undefined && field === "inn"
                ? length
                : ORG.current["innLength"];
    }
}
