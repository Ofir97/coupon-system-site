import { combineReducers, createStore } from "redux";
import { companiesReducer } from "./CompaniesAppState";
import { couponsReducer } from "./CouponsAppState";
import { customersReducer } from "./CustomersAppState";

// Single Reducer
//const store = createStore(catsReducer);

// For getting data
//const xys = store.getState().cats;

//Multiple catsReducer
const reducers = combineReducers({companiesState: companiesReducer, customersState: customersReducer, couponsState: couponsReducer});
const store = createStore(reducers)

// For getting data
//const xyz = store.getState().catState.cats;

export default store;