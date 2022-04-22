// выбор организации черезе меню select
export function chooseMyOrg(event, ORGS) {
    const OrgName = event.target.value;
    const [org] = ORGS.filter((org) => org.orgname === OrgName);
    localStorage.setItem("OrgsId", org.id);
    return org;
}
