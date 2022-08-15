import { ICounterparty } from "../interfaces/counterparty";
import { IOrg } from "../interfaces/organization";

export const isOrganization = (Org: IOrg | ICounterparty | null) =>
    Org?.kpp === "null" || Org?.kpp === "undefined" ? false : true;
