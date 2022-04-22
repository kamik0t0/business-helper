const SETCOUNTERPARTY = {
    counterparty: {},
};

export function setCounterpartyReducer(state = SETCOUNTERPARTY, action) {
    switch (action.type) {
        case "COUNTERPARTY":
            return { counterparty: action.payload };

        default:
            return state;
    }
}
