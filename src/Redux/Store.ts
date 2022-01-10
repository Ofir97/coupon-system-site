import { combineReducers, createStore } from "redux";
import { companiesReducer } from "./CompaniesAppState";
import { couponsReducer } from "./CouponsAppState";
import { customerCouponsReducer } from "./CustomerCouponsAppState";
import { customersReducer } from "./CustomersAppState";

// Single Reducer
//const store = createStore(catsReducer);

// For getting data
//const xys = store.getState().cats;

//Multiple reducers
const reducers = combineReducers({
    companiesState: companiesReducer,
    customersState: customersReducer,
    couponsState: couponsReducer,
    customerCouponsState: customerCouponsReducer
});

const store = createStore(reducers)

// For getting data
//const xyz = store.getState().catState.cats;

export default store;