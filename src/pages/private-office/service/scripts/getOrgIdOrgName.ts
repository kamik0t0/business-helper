import { IOrg } from "../../../../interfaces/organization";

export const getOrgByOrgName = (orgs: IOrg[], orgname: string): IOrg[] =>
    [...orgs].filter((org: IOrg) => org.orgname === orgname);
