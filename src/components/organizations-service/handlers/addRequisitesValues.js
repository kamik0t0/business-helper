export function addRequisitesValues(requisitesNames, requisitesValues) {
    for (const requisiteName of requisitesNames) {
        requisiteName.value = requisitesValues[requisiteName.field];
    }
    return requisitesNames;
}
