export function showUpdateChanges(ORGS, OrgId) {
    const [activeOrg] = ORGS.filter((org) => org.id === OrgId);
    return activeOrg;
}
