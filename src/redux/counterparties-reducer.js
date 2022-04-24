const DEFAULTSTATE = {
    counterparties: [],
};

const COUNTERPARTIES = "COUNTERPARTIES";

export function setCounterparties(state = DEFAULTSTATE, action) {
    switch (action.type) {
        case COUNTERPARTIES:
            return { counterparties: [...action.payload] };

        default:
            return state;
    }
}

export const setCounterpartiesAction = (payload) => ({
    type: COUNTERPARTIES,
    payload,
});
