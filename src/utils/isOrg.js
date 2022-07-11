export function isOrganization(Org) {
    if (Org) return Org.kpp === "undefined" ? false : true;
}
