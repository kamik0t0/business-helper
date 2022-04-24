const AUTHSTATE = {
    isAuth: false,
};

const AUTH = "AUTH";

export function authReducer(state = AUTHSTATE, action) {
    switch (action.type) {
        case AUTH:
            return { isAuth: action.payload };

        default:
            return state;
    }
}

export const setAuthAction = (payload) => ({
    type: AUTH,
    payload,
});
