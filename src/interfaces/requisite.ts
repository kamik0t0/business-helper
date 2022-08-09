// интерфейс описывает поле ввода реквизитов
export interface IRequisiteView {
    value?: string | number | undefined | null | boolean;
    inputField: string;
    inputFieldName: string;
    isNumber: boolean;
    focus: boolean;
    [prop: string]: string | number | null | undefined | boolean;
}

export interface IRequisiteViewWithLength extends IRequisiteView {
    inputValueLength: number;
}
