import { IEvent } from "../../../interfaces/event";
import { IInvoiceItem } from "../../../interfaces/invoice";

export function setInvoicePositionCalculations(
    event: IEvent,
    index: number,
    positions: IInvoiceItem[],
    prop: string
): IInvoiceItem[] {
    if (prop === "nomenclature") {
        const value = event.target.value;
        positions[index][prop] = value as string;
    } else {
        const value = +event.target.value < 0 ? 0 : +event.target.value;
        positions[index][prop] = value;
    }
    return positions;
}

// Подсчёт сумм по накладной и сохранение значения для отправки
export const calculateInvoiceSummary = (
    positions: IInvoiceItem[],
    field: string
): number =>
    positions.reduce(
        (prev: number, item: IInvoiceItem) => prev + +item[field]!,
        0
    );

// формирование текущей даты
export function makeDefaultDate(): string {
    const date = new Date();
    const month =
        date.getMonth() >= 10
            ? date.getMonth() + 1
            : "0" + +(date.getMonth() + 1);
    const day = date.getDate() >= 10 ? date.getDate() : "0" + +date.getDate();
    const hour =
        date.getHours() >= 10 ? date.getHours() : "0" + +date.getHours();
    const minute =
        date.getMinutes() >= 10 ? date.getMinutes() : "0" + +date.getMinutes();
    const seconds =
        date.getSeconds() >= 10 ? date.getSeconds() : "0" + +date.getSeconds();
    return `${date.getFullYear()}-${month}-${day}T${hour}:${minute}:${seconds}.000Z`;
}

export function makeDate(): string {
    const date = new Date();
    const hour =
        date.getHours() >= 10 ? date.getHours() : "0" + +date.getHours();
    const minute =
        date.getMinutes() >= 10 ? date.getMinutes() : "0" + +date.getMinutes();
    const seconds =
        date.getSeconds() >= 10 ? date.getSeconds() : "0" + +date.getSeconds();
    return `T${hour}:${minute}:${seconds}.000Z`;
}

export const getDate = (event: IEvent): string =>
    `${event.target.value}${makeDate()}`;

export const getCounterpartyName = (event: IEvent): string =>
    event.target.value as string;
