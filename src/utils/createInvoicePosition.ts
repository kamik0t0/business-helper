import { IInvoicePosition } from "../interfaces/invoice";
import { InvoicePositionConstructor } from "./InvoiceItemClass";

export const createInvoiePosition = (): IInvoicePosition =>
    new InvoicePositionConstructor(
        null,
        0,
        "",
        0,
        0,
        0,
        0.2,
        0,
        0,
        false,
        "",
        null,
        null
    );
