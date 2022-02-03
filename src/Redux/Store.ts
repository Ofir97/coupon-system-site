import { combineReducers, createStore } from "redux";
import { authReducer } from "./AuthAppState";
import { companiesReducer } from "./CompaniesAppState";
import { companyCouponsReducer } from "./CompanyCouponsAppState";
import { couponsReducer } from "./CouponsAppState";
import { customerCouponsReducer } from "./CustomerCouponsAppState";
import { customersReducer } from "./CustomersAppState";

const reducers = combineReducers({
    companiesState: companiesReducer,
    customersState: customersReducer,
    couponsState: couponsReducer,
    customerCouponsState: customerCouponsReducer,
    companyCouponsState: companyCouponsReducer,
    authState: authReducer
});

const store = createStore(reducers)

export default store;