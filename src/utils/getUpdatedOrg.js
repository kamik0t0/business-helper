export function getUpdatedOrg(ORGS, OrgId) {
    const [MyOrg] = ORGS.filter((org) => org.id === OrgId);
    return MyOrg;
}
