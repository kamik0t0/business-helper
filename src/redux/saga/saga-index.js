import { all } from "redux-saga/effects";
import { getOrgDataVoidWatcher } from "./private-saga.js";
import { authWatcher } from "./auth-saga.js";

export function* rootWatcher() {
    yield all([getOrgDataVoidWatcher(), authWatcher()]);
}
