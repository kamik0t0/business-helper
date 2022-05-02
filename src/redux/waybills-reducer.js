const STATE = {
    waybills: [],
};

const WAYBILLS = "WAYBILLS";

export function setWaybills(state = STATE, action) {
    switch (action.type) {
        case "WAYBILLS":
            return { waybills: action.payload };

        default:
            return state;
    }
}

export const setWaybillsAction = (payload) => ({ type: WAYBILLS, payload });
