import { ICounterparty } from "../interfaces/counterparty";
import { IRequisiteView } from "../interfaces/requisite";

export class Organizaton implements ICounterparty {
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
    // ogrn?: string | null | undefined;
    // bank?: string | null | undefined;
    // bik?: string | null | undefined;
    // korr?: string | null | undefined;
    // acc?: string | null | undefined;
    // position?: string | null | undefined;
    // okopf?: string | null | undefined;
    // okfs?: string | null | undefined;
    // okved?: string | null | undefined;
    // okpo?: string | null | undefined;
    [prop: string]: string | number | null | undefined;
    constructor(
        id: number | null | undefined,
        createdAt: string | undefined,
        UserId: number | null,
        OrgId: number | undefined,
        inn: string | null,
        kpp: string | null,
        opf: string | null,
        orgname: string | null,
        address: string | null,
        director: string | null
        // ogrn?: string | null | undefined,
        // bank?: string | null | undefined,
        // bik?: string | null | undefined,
        // korr?: string | null | undefined,
        // acc?: string | null | undefined,
        // position?: string | null | undefined,
        // okopf?: string | null | undefined,
        // okfs?: string | null | undefined,
        // okved?: string | null | undefined,
        // okpo?: string | null | undefined
    ) {
        this.id = id || undefined;
        this.UserId = UserId;
        this.createdAt = createdAt || undefined;
        this.OrgId = OrgId || undefined;
        this.opf = opf || null;
        this.orgname = orgname || null;
        this.inn = inn || null;
        this.kpp = kpp || null;
        this.address = address || null;
        this.director = director || null;
        // this.ogrn = ogrn || null;
        // this.bank = bank || null;
        // this.bik = bik || null;
        // this.korr = korr || null;
        // this.acc = acc || null;
        // this.position = position || null;
        // this.okopf = okopf || null;
        // this.okfs = okfs || null;
        // this.okved = okved || null;
        // this.okpo = okpo || null;
    }
}

export const OrgFields: IRequisiteView[] = [
    {
        value: null,
        inputField: "orgname",
        inputFieldName: "Наименование:",
        isNumber: false,
    },
    {
        value: null,
        inputField: "inn",
        inputFieldName: "ИНН:",
        inputValueLength: 10,
        isNumber: true,
    },
    {
        value: null,
        inputField: "kpp",
        inputFieldName: "КПП:",
        inputValueLength: 9,
        isNumber: true,
    },
    // {
    //     inputField: "ogrn",
    //     inputFieldName: "ОГРН:",
    //     type: "text",
    // },
    // {
    //     inputField: "bank",
    //     inputFieldName: "Банк:",
    //     type: "text",
    // },
    // {
    //     inputField: "bik",
    //     inputFieldName: "БИК:",
    //     type: "text",
    // },
    // {
    //     inputField: "korr",
    //     inputFieldName: "Корреспондентский счет:",
    //     type: "text",
    // },
    // {
    //     inputField: "acc",
    //     inputFieldName: "Расчетный счет:",
    //     type: "text",
    // },
    {
        value: null,
        inputField: "address",
        inputFieldName: "Адрес:",
        isNumber: false,
    },
    {
        value: null,
        inputField: "director",
        inputFieldName: "Руководитель:",
        isNumber: false,
    },
    // {
    //     inputField: "position",
    //     inputFieldName: "Должность руководителя:",
    //     type: "text",
    // },
    // {
    //     inputField: "okopf",
    //     inputFieldName: "ОКОПФ:",
    //     type: "text",
    // },
    // {
    //     inputField: "okfs",
    //     inputFieldName: "ОКФС:",
    //     type: "text",
    // },
    // {
    //     inputField: "okved",
    //     inputFieldName: "ОКВЭД:",
    //     type: "text",
    // },
    // {
    //     inputField: "okpo",
    //     inputFieldName: "ОКПО:",
    //     type: "text",
    // },
];

export const IpFields: IRequisiteView[] = [
    {
        value: null,
        inputField: "orgname",
        inputFieldName: "Наименование:",
        isNumber: false,
    },
    {
        value: null,
        inputField: "inn",
        inputFieldName: "ИНН:",
        inputValueLength: 12,
        isNumber: true,
    },

    // {
    //     inputField: "ogrn",
    //     inputFieldName: "ОГРН:",
    //     type: "text",
    // },
    // {
    //     inputField: "bank",
    //     inputFieldName: "Банк:",
    //     type: "text",
    // },
    // {
    //     inputField: "bik",
    //     inputFieldName: "БИК:",
    //     type: "text",
    // },
    // {
    //     inputField: "korr",
    //     inputFieldName: "Корреспондентский счет:",
    //     type: "text",
    // },
    // {
    //     inputField: "acc",
    //     inputFieldName: "Расчетный счет:",
    //     type: "text",
    // },
    {
        value: null,
        inputField: "address",
        inputFieldName: "Адрес:",
        isNumber: false,
    },
    // {
    //     inputField: "okopf",
    //     inputFieldName: "ОКОПФ:",
    //     type: "text",
    // },
    // {
    //     inputField: "okfs",
    //     inputFieldName: "ОКФС:",
    //     type: "text",
    // },
    // {
    //     inputField: "okved",
    //     inputFieldName: "ОКВЭД:",
    //     type: "text",
    // },
];
