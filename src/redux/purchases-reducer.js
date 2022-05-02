const STATE = {
    purchases: [],
};

const PURCHASES = "PURCHASES";

export function setPurchases(state = STATE, action) {
    switch (action.type) {
        case "PURCHASES":
            return { purchases: action.payload, filter: action.filter };

        default:
            return state;
    }
}

export const setPurchasesAction = (payload, filter) => ({
    type: PURCHASES,
    payload,
    filter,
});
