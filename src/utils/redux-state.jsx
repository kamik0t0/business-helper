// Состояние redux для контроля авторизации

import { createStore, combineReducers } from "redux";

const REGSTATE = {
    isAuth: false,
};

function authReducer(state = REGSTATE, action) {
    switch (action.type) {
        case "REG_TRUE":
            return { isAuth: action.payload };

        case "REG_FALSE":
            const keys = Object.keys(localStorage);
            for (const key of keys) {
                if (key !== "currentOrg") {
                    localStorage.removeItem(key);
                }
            }

            return { isAuth: action.payload };

        default:
            return state;
    }
}

const ERROR = {
    isError: false,
};

function errorReducer(state = ERROR, action) {
    switch (action.type) {
        case "isERROR_TRUE":
            return { isError: action.payload };

        case "isERROR_FALSE":
            return { isError: action.payload };
        default:
            return state;
    }
}

// объединение reduc'еров
const rootReducer = combineReducers({
    authReducer: authReducer,
    errorReducer: errorReducer,
});

export const store = createStore(rootReducer);
