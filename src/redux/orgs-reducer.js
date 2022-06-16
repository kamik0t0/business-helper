const STATE = {
    orgs: [],
};

const ORGS = "ORGS";

export function setOrgsReducer(state = STATE, action) {
    switch (action.type) {
        case ORGS:
            return { orgs: action.payload };

        default:
            return state;
    }
}

export const setOrgsAction = (payload) => ({ type: ORGS, payload });

export const orgsSelector = (state) => state.setOrgsReducer.orgs;
