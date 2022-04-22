export function addRequisitesValues(
    orgRequisites,
    IpRequisites,
    requisitesValues = false,
    isORG
) {
    if (requisitesValues === false) return null;
    if (isORG) {
        for (const requisiteName of orgRequisites) {
            requisiteName.value = requisitesValues[requisiteName.field];
        }
        return orgRequisites;
    } else {
        for (const requisiteName of IpRequisites) {
            requisiteName.value = requisitesValues[requisiteName.field];
        }
        return IpRequisites;
    }
}
