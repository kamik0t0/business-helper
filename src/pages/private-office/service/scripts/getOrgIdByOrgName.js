export function getOrgIdByOrgName(ORGANIZATIONS, orgname) {
    const [{ id: OrgId }] = [...ORGANIZATIONS].filter(
        (org) => org.orgname === orgname
    );
    return OrgId;
}
