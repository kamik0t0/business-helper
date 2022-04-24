const SETCOUNTERPARTY = {
    counterparty: {},
};

const COUNTERPARTY = "COUNTERPARTY";

export function setCounterpartyReducer(state = SETCOUNTERPARTY, action) {
    switch (action.type) {
        case COUNTERPARTY:
            return { counterparty: action.payload };

        default:
            return state;
    }
}

export const setCounterpartyAction = (payload) => ({
    type: COUNTERPARTY,
    payload,
});
