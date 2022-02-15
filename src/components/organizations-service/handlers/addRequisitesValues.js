export function addRequisitesValues(requisitesNames, requisitesValues = false) {
    if (requisitesValues === false) return null;
    for (const requisiteName of requisitesNames) {
        requisiteName.value = requisitesValues[requisiteName.field];
    }
    return requisitesNames;
}
