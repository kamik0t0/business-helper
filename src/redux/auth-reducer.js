const REGSTATE = {
    isAuth: false,
};

const REG_TRUE = "REG_TRUE";
const REG_FALSE = "REG_FALSE";

export function authReducer(state = REGSTATE, action) {
    switch (action.type) {
        case REG_TRUE:
            return { isAuth: action.payload };

        case REG_FALSE:
            const keys = Object.keys(localStorage);
            for (const key of keys) {
                localStorage.removeItem(key);
            }

            return { isAuth: action.payload };

        default:
            return state;
    }
}

export const setRegTrueAction = (payload) => ({
    type: REG_TRUE,
    payload,
});
export const setRegFalseAction = (payload) => ({
    type: REG_FALSE,
    payload,
});
