// получение реквизитов + контроль ИНН и КПП. Надо сделать декомпозицию.
export function getRequisites(event, field, length, ORG, isORG) {
    console.log(field);
    if (isORG) {
        if (field in ORG) ORG[field] = event.target.value.trim();
        ORG["kppLength"] =
            length !== undefined && field === "kpp" ? length : ORG["kppLength"];
        ORG["innLength"] =
            length !== undefined && field === "inn" ? length : ORG["innLength"];
    } else {
        if (field in ORG) ORG[field] = event.target.value.trim();
        ORG["innLength"] =
            length !== undefined && field === "inn" ? length : ORG["innLength"];
    }
}
