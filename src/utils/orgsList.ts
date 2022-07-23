import { IOrg } from "../interfaces/organization";

export const makeOrgsArr = (organizations: IOrg[] = []) => [
    "Выбрать организацию",
    ...organizations.map((org) => `${Object.values(org.orgname).join("")}`),
];
