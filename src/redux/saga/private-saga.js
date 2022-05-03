import { put, takeEvery, call } from "redux-saga/effects";
import { channel } from "redux-saga";
import { setCounterpartiesAction } from "../counterparties-reducer.js";
import { setSalesAction } from "../sales-reducer.js";
import { setPurchasesAction } from "../purchases-reducer.js";
import { getData } from "../../utils/getData.js";
import { setAuthAction } from "../auth-reducer.js";
import { chooseMyOrg } from "../../utils/getOrgs.js";
import { setMyOrgAction } from "../setMyOrg-reducer.js";

const GETPRIVATEDATA = "GETPRIVATEDATA";

// функция "наблюдатель" которая по паттерну вызывает "воркер" getOrgDataVoidWorker
export function* getOrgDataVoidWatcher() {
    yield takeEvery(GETPRIVATEDATA, getOrgDataVoidWorker);
}
// функция вызываемая из React-компонента и принимающая массив аргументов
export const getPrivateData = (...payload) => {
    return { type: GETPRIVATEDATA, payload };
};
// функция-"воркер" основанная на генераторах выполняют логику по работе с хранилищем
function* getOrgDataVoidWorker({ payload }) {
    const [event, setLoader, ORGS] = payload;

    setLoader();

    const MYORG = yield call(chooseMyOrg, event, ORGS);
    yield put(setMyOrgAction(MYORG));
    const OrgId = localStorage.getItem("OrgsId");

    const URLS = [
        `/counterparty/?OrgId=${OrgId}`,
        `/sales/?OrgId=${OrgId}`,
        `/purchases/?OrgId=${OrgId}`,
    ];
    const ACTIONS = [
        setCounterpartiesAction,
        setSalesAction,
        setPurchasesAction,
    ];

    const authErrorCallback = channel();

    let requests = yield call(() =>
        URLS.map((url) =>
            getData(url, () => authErrorCallback.put(setAuthAction(false)))
        )
    );

    const data = yield call(() => Promise.resolve(Promise.all(requests)));

    for (let i = 0; i < ACTIONS.length; i++) {
        yield put(ACTIONS[i](data[i]));
    }

    setLoader();
}
