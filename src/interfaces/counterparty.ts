export interface ICounterparty {
    id: number | null;
    createdAt: string | null;
    UserId: number | null;
    OrgId: number | null;
    inn: string | null;
    opf: string | null;
    orgname: string | null;
    address: string | null;
    kpp: string | null;
    director: string | null;
    // ogrn: string;
    // bank: string;
    // bik: string;
    // korr: string;
    // acc: string;
    // position: string;
    // okopf: string;
    // okfs: string;
    // okved: string;
    // okpo: string;
    highlight?: boolean | undefined;
    [prop: string]: string | number | null | undefined | boolean;
}

export interface CounterpartiesState {
    counterparties: ICounterparty[];
    counterparty: ICounterparty | null;
    isLoading: boolean;
    error: string | null;
}

export interface ICounterpartyWithInputValueLength extends ICounterparty {
    inputValueLength?: number;
}
