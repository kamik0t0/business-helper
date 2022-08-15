import React from "react";
import { IInvoice, IInvoicePosition } from "../../../interfaces/invoice";

export function assignEnteredPositionDataToInvoice(
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
    positions: IInvoicePosition[],
    prop: string
): IInvoicePosition[] {
    if (prop === "nomenclature") {
        const value = event.target.value;
        positions[index][prop] = value as string;
    } else {
        const value = +event.target.value < 0 ? 0 : +event.target.value;
        positions[index][prop] = value;
    }
    return positions;
}

export function calculateInvoicePositions(arr: IInvoicePosition[]) {
    arr.forEach((item) => {
        item.summ = item.quantity * item.price;
        item.nds = item.summ * item.nds_percent;
        item.total = item.summ + item.nds;
    });
    return arr;
}

export function assignInvoiceSummary(
    newInvoice: IInvoice,
    positions: IInvoicePosition[]
) {
    return Object.assign({}, newInvoice, {
        summ: calculateInvoiceSummary(positions, "summ"),
        nds: calculateInvoiceSummary(positions, "nds"),
        total: calculateInvoiceSummary(positions, "total"),
    });
}

// Подсчёт сумм по накладной и сохранение значения для отправки
export const calculateInvoiceSummary = (
    positions: IInvoicePosition[],
    field: string
): number =>
    positions.reduce(
        (prev: number, item: IInvoicePosition) => prev + +item[field]!,
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

export const getDate = (event: React.ChangeEvent<HTMLInputElement>): string =>
    `${event.target.value}${makeDate()}`;
