import { InvoicePositionConstructor } from "./InvoiceItemClass";

export const createInvoiePosition = () =>
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
