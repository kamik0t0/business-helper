import { IRequisiteView } from "../interfaces/requisite";

/* TODO: min length & max length for each class */

export class orgname implements IRequisiteView {
    inputField: string;
    inputFieldName: string;
    isNumber: boolean;
    inputValueLength: number;
    focus: boolean;
    value: any;

    constructor(value: string | null) {
        this.inputField = "orgname";
        this.inputFieldName = "Наименование:";
        this.inputValueLength = 10;
        this.isNumber = false;
        this.focus = false;
        this.value = value || null;
    }
    [prop: string]: string | number | boolean | null | undefined | boolean;
}

export class inn implements IRequisiteView {
    inputField: string;
    inputFieldName: string;
    isNumber: boolean;
    inputValueLength: number;
    focus: boolean;
    value: any;

    constructor(value: string | null) {
        this.inputField = "inn";
        this.inputFieldName = "ИНН:";
        this.isNumber = true;
        this.inputValueLength = 10;
        this.focus = false;
        this.value = value || null;
    }
    [prop: string]: string | number | boolean | null | undefined;
}

export class IEinn implements IRequisiteView {
    inputField: string;
    inputFieldName: string;
    isNumber: boolean;
    inputValueLength: number;
    focus: boolean;
    value: any;

    constructor(value: string | null) {
        this.inputField = "inn";
        this.inputFieldName = "ИНН:";
        this.inputValueLength = 12;
        this.value = value || null;
        this.focus = false;
        this.isNumber = true;
    }
    [prop: string]: string | number | boolean | null | undefined;
}

export class kpp implements IRequisiteView {
    inputField: string;
    inputFieldName: string;
    isNumber: boolean;
    inputValueLength: number;
    focus: boolean;
    value: any;

    constructor(value: string | null) {
        this.inputField = "kpp";
        this.inputFieldName = "КПП:";
        this.inputValueLength = 9;
        this.value = value || null;
        this.focus = false;
        this.isNumber = true;
    }
    [prop: string]: string | number | boolean | null | undefined;
}

export class address implements IRequisiteView {
    inputField: string;
    inputFieldName: string;
    isNumber: boolean;
    focus: boolean;
    inputValueLength: number;
    value: any;

    constructor(value: string | null) {
        this.inputField = "address";
        this.inputFieldName = "Адрес:";
        this.inputValueLength = 10;
        this.value = value || null;
        this.focus = false;
        this.isNumber = false;
    }

    [prop: string]: string | number | boolean | null | undefined;
}

export class director implements IRequisiteView {
    inputField: string;
    inputFieldName: string;
    isNumber: boolean;
    focus: boolean;
    inputValueLength: number;
    value: any;

    constructor(value: string | null) {
        this.inputField = "director";
        this.inputFieldName = "Руководитель:";
        this.inputValueLength = 10;
        this.value = value || null;
        this.focus = false;
        this.isNumber = false;
    }
    [prop: string]: string | number | boolean | null | undefined;
}

export class OrgFieldsFactory {
    static fields = {
        orgname: orgname,
        inn: inn,
        kpp: kpp,
        address: address,
        director: director,
    };

    createFields(
        orgname: string | null,
        IEinn: string | null,
        kpp: string | null,
        address: string | null,
        director: string | null
    ) {
        const orgNameFieldClass = OrgFieldsFactory.fields.orgname;
        const innFieldClass = OrgFieldsFactory.fields.inn;
        const kppFieldClass = OrgFieldsFactory.fields.kpp;
        const addressFieldClass = OrgFieldsFactory.fields.address;
        const directorFieldClass = OrgFieldsFactory.fields.director;

        return [
            new orgNameFieldClass(orgname),
            new innFieldClass(IEinn),
            new kppFieldClass(kpp),
            new addressFieldClass(address),
            new directorFieldClass(director),
        ];
    }
}

export class IEFieldsFactory {
    static fields = {
        orgname: orgname,
        IEinn: IEinn,
        address: address,
    };

    createFields(
        orgname: string | null,
        IEinn: string | null,
        address: string | null
    ) {
        const orgNameFieldClass = IEFieldsFactory.fields.orgname;
        const innFieldClass = IEFieldsFactory.fields.IEinn;
        const addressFieldClass = IEFieldsFactory.fields.address;

        return [
            new orgNameFieldClass(orgname),
            new innFieldClass(IEinn),
            new addressFieldClass(address),
        ];
    }
}
