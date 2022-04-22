const COUNTERPARTIES = {
    counterparties: [],
};

export function setCounterparties(state = COUNTERPARTIES, action) {
    switch (action.type) {
        case "COUNTERPARTIES":
            return { counterparties: [...action.payload] };

        default:
            return state;
    }
}
