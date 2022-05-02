const STATE = {
    waybill: {},
};

const WAYBILL = "WAYBILL";

export function setWaybill(state = STATE, action) {
    switch (action.type) {
        case WAYBILL:
            return { waybill: action.payload };

        default:
            return state;
    }
}

export const setWaybillAction = (payload) => ({ type: WAYBILL, payload });
