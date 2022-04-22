import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./auth-reducer.js";
import { errorReducer } from "./error-reducer.js";
import { setMyOrgReducer } from "./setMyOrg-reducer.js";
import { setOrgsReducer } from "./orgs-reducer.js";
import { setCounterparties } from "./counterparties-reducer.js";
import { setSales } from "./sales-reducer.js";
import { setPurchases } from "./purchases-reducer.js";
import { setCounterpartyReducer } from "./counterparty-reducer.js";
import { setSale } from "./sale-reducer.js";
import { setPurchase } from "./purchase-reducer.js";

const rootReducer = combineReducers({
    authReducer: authReducer,
    errorReducer: errorReducer,
    setMyOrgReducer: setMyOrgReducer,
    setOrgsReducer: setOrgsReducer,
    setCounterparties: setCounterparties,
    setSales: setSales,
    setPurchases: setPurchases,
    setCounterpartyReducer: setCounterpartyReducer,
    setPurchase: setPurchase,
    setSale: setSale,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
