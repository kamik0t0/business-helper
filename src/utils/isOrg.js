export function isOrganization(myOrg) {
    if (myOrg) return myOrg.kpp === "undefined" ? false : true;
}
