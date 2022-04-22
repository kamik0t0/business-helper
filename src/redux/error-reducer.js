const ERROR = {
    isError: false,
    message: "",
};

const isERROR_TRUE = "isERROR_TRUE";
const isERROR_FALSE = "isERROR_FALSE";

export function errorReducer(state = ERROR, action) {
    switch (action.type) {
        case isERROR_TRUE:
            return { isError: action.payload, message: action.message };

        case isERROR_FALSE:
            return { isError: action.payload, message: action.message };
        default:
            return state;
    }
}

export const setErrorTrueAction = (payload, message) => ({
    type: isERROR_TRUE,
    payload,
    message,
});
export const setErrorFalseAction = (payload, message) => ({
    type: isERROR_FALSE,
    payload,
    message,
});
