import { highlight } from "../../../../utils/highlight.js";

export function getValue(
    event,
    number,
    counterparties,
    setCounterparties,
    row,
    setCounterparty
) {
    localStorage.setItem(
        "counterparty",
        JSON.stringify(counterparties[number])
    );
    localStorage.setItem("counterpartyId", counterparties[number].id);
    highlight(number, counterparties, setCounterparties, row);
    let counterparty = JSON.parse(localStorage.getItem("counterparty"));
    setCounterparty(counterparty);
}
