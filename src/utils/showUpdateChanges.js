export function showUpdateChanges(ORGS, myOrg) {
    const id = myOrg.id;
    const [activeOrg] = ORGS.filter((org) => org.id === id);
    return activeOrg;
}
