import axios from "axios";
import { getData } from "../../utils/getData.ts";
import { setErrorTrueAction } from "../../redux/error-reducer.js";
import { setOrgsAction } from "../../redux/orgs-reducer.js";
import { setAuthAction } from "../../redux/auth-reducer.js";
import { setAuthErrorAction } from "../../redux/authError-reducer.js";
import { call, takeEvery, put } from "redux-saga/effects";
import { channel } from "redux-saga";
import { setCounterpartiesAction } from "../counterparties-reducer";
import { setSalesAction } from "../sales-reducer";
import { setPurchasesAction } from "../purchases-reducer";
import { setMyOrgAction } from "../setMyOrg-reducer";
import { setWaybillAction } from "../waybill-reducer";

const AUTHORIZATION = "AUTHORIZATION";

export function* authWatcher() {
    yield takeEvery(AUTHORIZATION, authWorker);
}

export const auth = (...payload) => {
    return { type: AUTHORIZATION, payload };
};

export function* authWorker({ payload }) {
    const [
        event,
        email,
        pass,
        setLoader,
        navigate,
        fromPage,
        search,
        type,
        orgId,
        waybill,
    ] = payload;
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

            // TODO: Refactoring

            if (orgId) {
                const MyOrg = ORGS.find((org) => +org.id === +orgId);
                if (Object.keys(MyOrg).length === 0) {
                    navigate("/private");
                }
                localStorage.setItem("OrgsId", orgId);
                yield put(setMyOrgAction(MyOrg));

                const URLS = [
                    process.env.REACT_APP_URL_COUNTERPARTY,
                    process.env.REACT_APP_URL_SALES,
                    process.env.REACT_APP_URL_PURCHASES,
                ];

                const ACTIONS = [
                    setCounterpartiesAction,
                    setSalesAction,
                    setPurchasesAction,
                ];

                const authErrorCallback = channel();

                let requests = yield call(() =>
                    URLS.map((url) =>
                        getData(url, { OrgId: orgId }, () =>
                            authErrorCallback.put(setAuthAction(false))
                        )
                    )
                );

                const data = yield call(() =>
                    Promise.resolve(Promise.all(requests))
                );

                for (let i = 0; i < ACTIONS.length; i++) {
                    yield put(ACTIONS[i](data[i]));
                }

                if (waybill) {
                    const waybills = type === "sales" ? data[1] : data[2];
                    const wbindex = waybills.findIndex(
                        (wb) => wb.id == waybill
                    );
                    yield put(setWaybillAction(waybills[wbindex]));
                }
            }
            navigate(`${fromPage}${search}`);
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
