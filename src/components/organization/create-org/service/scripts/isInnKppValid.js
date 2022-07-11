// проверка соответствия инн / кпп необходимой длине
export function isInnKppValid(organization) {
    if (
        (organization["inn"] !== undefined &&
            organization["inn"].length !== organization["innLength"]) ||
        (organization["kpp"] !== undefined &&
            organization["kpp"].length !== organization["kppLength"])
    )
        return false;
    return true;
}
