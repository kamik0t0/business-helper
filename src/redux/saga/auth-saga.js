import axios from "axios";
import { getData } from "../../utils/getData";
import { setErrorTrueAction } from "../../redux/error-reducer.js";
import { setOrgsAction } from "../../redux/orgs-reducer.js";
import { setAuthAction } from "../../redux/auth-reducer.js";
import { setAuthErrorAction } from "../../redux/authError-reducer.js";
import { call, takeEvery, put } from "redux-saga/effects";
import { channel } from "redux-saga";

const AUTHORIZATION = "AUTHORIZATION";

export function* authWatcher() {
    yield takeEvery(AUTHORIZATION, authWorker);
}

export const auth = (...payload) => {
    return { type: AUTHORIZATION, payload };
};

export function* authWorker({ payload }) {
    const [event, email, pass, setLoader] = payload;
    yield put(setAuthErrorAction(false, ""));
    setLoader();
    event.preventDefault();

    const user = new FormData();
    user.set("email", "");
    user.set("pass", "");

    if (email && pass !== undefined) {
        user.set("email", email.trim());
        user.set("pass", pass.trim());
    }

    // проверка на ввод
    for (const [name, value] of user) {
        if (value.trim().length === 0) {
            yield put(setAuthErrorAction(true, "Введите пароль и логин"));
            return;
        }
    }

    try {
        const AuthData = yield call(() =>
            Promise.resolve(axios.post(process.env.REACT_APP_URL_AUTH, user))
        );
        setLoader();
        if (AuthData.data.auth) {
            yield put(setAuthAction(true));

            localStorage.setItem("token", AuthData.data.token);
            localStorage.setItem("email", email);
            localStorage.setItem("UserId", AuthData.data.id);

            const UserId = localStorage.getItem("UserId");
            const authErrorCallback = channel();
            const ORGS = yield call(() =>
                getData(
                    process.env.REACT_APP_URL_PRIVATE_OFFICE,
                    { UserId },
                    () => authErrorCallback.put(setAuthAction(false))
                )
            );
            yield put(setOrgsAction(ORGS));
        } else {
            yield put(setAuthErrorAction(true, AuthData.data.message));
            return false;
        }
    } catch (error) {
        setLoader();
        yield put(setErrorTrueAction(true, error.message));
    }
}

// "https://deploy-test-business-assist.herokuapp.com/login",
