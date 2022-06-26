export class Organizaton {
    constructor(
        OrgId,
        opf,
        orgname,
        inn,
        kpp,
        // ogrn,
        // bank,
        // bik,
        // korr,
        // acc,
        address,
        director
        // position,
        // okopf,
        // okfs,
        // okved,
        // okpo
    ) {
        this.OrgId = OrgId;
        this.opf = opf;
        this.orgname = orgname;
        this.inn = inn;
        this.kpp = kpp;
        // this.ogrn = ogrn;
        // this.bank = bank;
        // this.bik = bik;
        // this.korr = korr;
        // this.acc = acc;
        this.address = address;
        this.director = director;
        // this.position = position;
        // this.okopf = okopf;
        // this.okfs = okfs;
        // this.okved = okved;
        // this.okpo = okpo;
    }
}

export let OrgFields = [
    {
        field: "orgname",
        name: "Наименование:",
        type: "text",
        num: false,
    },
    {
        field: "inn",
        name: "ИНН:",
        type: "text",
        lngth: 10,
        num: true,
    },
    {
        field: "kpp",
        name: "КПП:",
        type: "text",
        lngth: 9,
        num: true,
    },
    // {
    //     field: "ogrn",
    //     name: "ОГРН:",
    //     type: "text",
    // },
    // {
    //     field: "bank",
    //     name: "Банк:",
    //     type: "text",
    // },
    // {
    //     field: "bik",
    //     name: "БИК:",
    //     type: "text",
    // },
    // {
    //     field: "korr",
    //     name: "Корреспондентский счет:",
    //     type: "text",
    // },
    // {
    //     field: "acc",
    //     name: "Расчетный счет:",
    //     type: "text",
    // },
    {
        field: "address",
        name: "Адрес:",
        type: "text",
        num: false,
    },
    {
        field: "director",
        name: "Руководитель:",
        type: "text",
        num: false,
    },
    // {
    //     field: "position",
    //     name: "Должность руководителя:",
    //     type: "text",
    // },
    // {
    //     field: "okopf",
    //     name: "ОКОПФ:",
    //     type: "text",
    // },
    // {
    //     field: "okfs",
    //     name: "ОКФС:",
    //     type: "text",
    // },
    // {
    //     field: "okved",
    //     name: "ОКВЭД:",
    //     type: "text",
    // },
    // {
    //     field: "okpo",
    //     name: "ОКПО:",
    //     type: "text",
    // },
];

export class Individual {
    constructor(
        opf,
        orgname,
        inn,
        // ogrn,
        // bank,
        // bik,
        // korr,
        // acc,
        address
        // okopf,
        // okfs,
        // okved,
    ) {
        this.opf = opf;
        this.orgname = orgname;
        this.inn = inn;
        // this.ogrn = ogrn;
        // this.bank = bank;
        // this.bik = bik;
        // this.korr = korr;
        // this.acc = acc;
        this.address = address;
        // this.okopf = okopf;
        // this.okfs = okfs;
        // this.okved = okved;
    }
}
export let IpFields = [
    {
        field: "orgname",
        name: "Наименование:",
        type: "text",
        num: false,
    },
    {
        field: "inn",
        name: "ИНН:",
        type: "text",
        lngth: 12,
        num: true,
    },

    // {
    //     field: "ogrn",
    //     name: "ОГРН:",
    //     type: "text",
    // },
    // {
    //     field: "bank",
    //     name: "Банк:",
    //     type: "text",
    // },
    // {
    //     field: "bik",
    //     name: "БИК:",
    //     type: "text",
    // },
    // {
    //     field: "korr",
    //     name: "Корреспондентский счет:",
    //     type: "text",
    // },
    // {
    //     field: "acc",
    //     name: "Расчетный счет:",
    //     type: "text",
    // },
    {
        field: "address",
        name: "Адрес:",
        type: "text",
        num: false,
    },
    // {
    //     field: "okopf",
    //     name: "ОКОПФ:",
    //     type: "text",
    // },
    // {
    //     field: "okfs",
    //     name: "ОКФС:",
    //     type: "text",
    // },
    // {
    //     field: "okved",
    //     name: "ОКВЭД:",
    //     type: "text",
    // },
];
