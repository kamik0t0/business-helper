const PURCHASE = {
    purchase: {},
};

export function setPurchase(state = PURCHASE, action) {
    switch (action.type) {
        case "PURCHASE":
            return { purchase: action.payload };

        default:
            return state;
    }
}
