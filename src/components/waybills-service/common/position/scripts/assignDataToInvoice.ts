import { IEvent } from "../../../../../interfaces/event";
import { IInvoicePosition } from "../../../../../interfaces/invoice";
import {
    assignEnteredPositionDataToInvoice,
    calculateInvoicePositions,
} from "../../scripts";

export function assignDataToInvoice(
    event: IEvent,
    positions: IInvoicePosition[],
    positionIndex: number,
    positionField: string
) {
    event.preventDefault();
    const redactablePositions = [...positions].map((position) =>
        Object.assign({}, position)
    );
    const updatedPositions = assignEnteredPositionDataToInvoice(
        event,
        positionIndex,
        redactablePositions,
        positionField
    );
    return calculateInvoicePositions(updatedPositions);
}
