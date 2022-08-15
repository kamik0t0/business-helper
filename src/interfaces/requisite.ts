// интерфейс описывает поле ввода реквизитов
export interface IRequisiteView {
    value: string | number | null | undefined | boolean;
    inputField: string;
    inputFieldName: string;
    isNumber: boolean;
    focus: boolean;
    inputValueLength: number;
    [prop: string]: string | number | null | undefined | boolean;
}

export interface IRequisiteViewWithLength extends IRequisiteView {
    inputValueLength: number;
}
