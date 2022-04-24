const AUTHERROR = {
    isInvalid: false,
    message: "",
};

const ISINVALID = "ISINVALID";

export function authErrorReducer(state = AUTHERROR, action) {
    switch (action.type) {
        case ISINVALID:
            return { isInvalid: action.payload, message: action.message };
        default:
            return state;
    }
}

export const setAuthErrorAction = (payload, message) => ({
    type: ISINVALID,
    payload,
    message,
});
