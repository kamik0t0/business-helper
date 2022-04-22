const STATE = {
    purchases: [],
};

const PURCHASES = "PURCHASES";

export function setPurchases(state = STATE, action) {
    switch (action.type) {
        case "PURCHASES":
            return { purchases: action.payload };

        default:
            return state;
    }
}

export const setPurchasesAction = (payload) => ({ type: PURCHASES, payload });
