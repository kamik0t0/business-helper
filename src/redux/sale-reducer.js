const STATE = {
    sale: {},
};

const SALE = "SALE";

export function setSale(state = STATE, action) {
    switch (action.type) {
        case SALE:
            return { sale: action.payload };

        default:
            return state;
    }
}

export const setSaleAction = (payload) => ({ type: SALE, payload });
