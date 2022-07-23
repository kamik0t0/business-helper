// интерфейс описывает разворот полей ввода реквизитов, например, ограничение по длине или допустимость ввода только цифр, и также содержит наименование поля
export interface IRequisiteView {
    value?: string | number | undefined | null;
    inputField: string;
    inputFieldName: string;
    isNumber: boolean;
    inputValueLength?: number | undefined;
}
