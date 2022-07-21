export const getOrgByOrgName = (ORGANIZATIONS, orgname) =>
    [...ORGANIZATIONS].filter((org) => org.orgname === orgname);
