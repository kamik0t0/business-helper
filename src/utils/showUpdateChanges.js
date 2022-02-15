export function showUpdateChanges(orgs, setOrg, org, type) {
    let id = org.id;
    switch (type) {
        case "myOrg":
            let [activeOrg] = orgs.filter((org) => org.id === id);
            localStorage.setItem(type, JSON.stringify(activeOrg));
            setOrg(activeOrg);
            break;
        case "counterparty":
            setOrg(orgs);
            break;

        default:
            break;
    }
}
