export interface ICounterparty {
    id: number;
    createdAt: string;
    UserId: number;
    OrgId: number;
    counterpartyName: string;
    inn: string;
    kpp: string;
    ogrn: string;
    bank: string;
    bik: string;
    korr: string;
    acc: string;
    address: string;
    director: string;
    position: string;
    okopf: string;
    okfs: string;
    okved: string;
    okpo: string;
    opf: string;
    highlight: boolean;
}

export interface CounterpartiesState {
    counterparties: ICounterparty[];
    counterparty: ICounterparty | null;
    loading: boolean;
    error: string | null;
}
