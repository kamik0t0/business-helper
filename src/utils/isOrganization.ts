import { ICounterparty } from "../interfaces/counterparty";

export const isOrganization = (Org: ICounterparty | null) =>
    Org?.kpp === "null" || Org?.kpp === "undefined" ? false : true;
