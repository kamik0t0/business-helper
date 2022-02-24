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
                localStorage.removeItem(key);
            }

            return { isAuth: action.payload };

        default:
            return state;
    }
}

const MYORGSTATE = {
    isMyOrgSelected: false,
};

function myOrgReducer(state = MYORGSTATE, action) {
    switch (action.type) {
        case "isMYORGSELECTED_TRUE":
            return { isMyOrgSelected: action.payload };

        case "isMYORGSELECTED_FALSE":
            return { isMyOrgSelected: action.payload };
        default:
            return state;
    }
}

const ERROR = {
    isError: false,
    message: "",
};

function errorReducer(state = ERROR, action) {
    switch (action.type) {
        case "isERROR_TRUE":
            return { isError: action.payload, message: action.message };

        case "isERROR_FALSE":
            return { isError: action.payload, message: action.message };
        default:
            return state;
    }
}

// объединение reduc'еров
const rootReducer = combineReducers({
    authReducer: authReducer,
    errorReducer: errorReducer,
    myOrgReducer: myOrgReducer,
});

export const store = createStore(rootReducer);
