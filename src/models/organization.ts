export interface IOrg {
    UserId: number;
    acc: string;
    address: string;
    bank: string;
    bik: string;
    createdAt: string;
    director: string;
    id: number;
    inn: string;
    korr: string;
    kpp: string;
    ogrn: string;
    okfs: string;
    okopf: string;
    okpo: string;
    okved: string;
    opf: string;
    orgname: string;
    position: string;
}

export interface OrgsState {
    orgs: IOrg[];
    org: IOrg | null;
    loading: boolean;
    error: string | null;
}
