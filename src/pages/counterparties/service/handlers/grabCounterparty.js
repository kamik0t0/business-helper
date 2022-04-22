export function grabCounterparty(
    number,
    counterparties,

    setCounterparty
) {
    localStorage.setItem(
        "counterparty",
        JSON.stringify(counterparties[number])
    );
    localStorage.setItem("counterpartyId", counterparties[number].id);

    let counterparty = JSON.parse(localStorage.getItem("counterparty"));
    setCounterparty(counterparty);
}
