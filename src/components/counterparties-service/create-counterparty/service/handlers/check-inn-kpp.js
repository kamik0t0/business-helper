export function checkInnKpp(organization) {
    for (const key in organization) {
        // если поле не заполнено
        if (organization[key] === undefined) return false;
        // если не заполнено, но есть пробелы
        if (
            organization[key] !== undefined &&
            typeof organization[key] === "string"
        ) {
            if (organization[key].trim().length === 0) return false;
        }
        // проверка соответствия инн / кпп необходимой длине
        if (
            (organization["inn"] !== undefined &&
                organization["inn"].length !== organization["innLength"]) ||
            (organization["kpp"] !== undefined &&
                organization["kpp"].length !== organization["kppLength"])
        )
            return false;
    }
}
