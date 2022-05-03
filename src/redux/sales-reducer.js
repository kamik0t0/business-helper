const STATE = {
    sales: [],
};

const SALES = "SALES";

export function setSales(state = STATE, action) {
    switch (action.type) {
        case "SALES":
            return { sales: action.payload, filter: action.filter };

        default:
            return state;
    }
}

export const setSalesAction = (payload, filter) => ({
    type: SALES,
    payload,
    filter,
});
