export function isOrganization(myOrg) {
    if (myOrg) return myOrg.kpp === "null" ? false : true;
}
