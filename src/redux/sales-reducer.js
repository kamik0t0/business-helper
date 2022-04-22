const STATE = {
    sales: [],
};

const SALES = "SALES";

export function setSales(state = STATE, action) {
    switch (action.type) {
        case "SALES":
            return { sales: action.payload };

        default:
            return state;
    }
}

export const setSalesAction = (payload) => ({ type: SALES, payload });
