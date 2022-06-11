const SETMYORGSTATE = {
    myOrg: {},
};

const MYORG = "MYORG";

export function setMyOrgReducer(state = SETMYORGSTATE, action) {
    switch (action.type) {
        case MYORG:
            return { myOrg: action.payload };

        default:
            return state;
    }
}

export const setMyOrgAction = (payload) => ({
    type: MYORG,
    payload,
});

export const MyOrg = (state) => state.setMyOrgReducer.myOrg;
