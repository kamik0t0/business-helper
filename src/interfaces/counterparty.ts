export interface ICounterparty {
    id: number | null | undefined;
    createdAt: string | undefined;
    UserId: number | null;
    OrgId: number | undefined;
    inn: string | null;
    kpp: string | null;
    opf: string | null;
    orgname: string | null;
    address: string | null;
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
    // highlight: boolean;
    [prop: string]: string | number | null | undefined;
}

export interface CounterpartiesState {
    counterparties: ICounterparty[];
    counterparty: ICounterparty | null;
    isLoading: boolean;
    error: string | null;
}

export interface ICounterpartyWithInputValueLength extends ICounterparty {
    inputValueLength?: number;
    [prop: string]: string | number | null | undefined;
}
