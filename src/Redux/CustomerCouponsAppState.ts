import { Coupon } from "../Models/Coupon";

// Step 1 - creating AppState and manage the collection of companies once and in a centeralized place.
export class CustomerCouponsAppState {
    public customerCoupons: Coupon[] = [];
}

// Step 2 - Define all possible action for your application state
export enum CustomerCouponsActionType {
    CustomerCouponsDownloaded = "CustomerCouponsDownloaded",
    CustomerCouponAdded = "CustomerCouponAdded",
    CustomerCouponUpdated = "CustomerCouponUpdated",
    CustomerCouponDeleted = "CustomerCouponDeleted"
}

// Step 3 - Define Action Interface to describe actionAction & payload if needed
export interface CustomerCouponAction {
    type: CustomerCouponsActionType;
    payload?: any;
}

// Step 4 - Export Action Creators functions that gets payload and return relevant Action
export function customerCouponsDownloadedAction(coupons: Coupon[]): CustomerCouponAction {
    return { type: CustomerCouponsActionType.CustomerCouponsDownloaded, payload: coupons };
}

export function customerCouponsAddedAction(coupon: Coupon): CustomerCouponAction {
    return { type: CustomerCouponsActionType.CustomerCouponAdded, payload: coupon };
}

export function customerCouponsUpdatedAction(coupon: Coupon): CustomerCouponAction {
    return { type: CustomerCouponsActionType.CustomerCouponUpdated, payload: coupon };
}

export function customerCouponsDeletedAction(id: number): CustomerCouponAction {
    return { type: CustomerCouponsActionType.CustomerCouponDeleted, payload: id };
}


// Step 5 - Reducer function perform the required action
export function customerCouponsReducer(currentState: CustomerCouponsAppState = new CustomerCouponsAppState(), action: CustomerCouponAction): CustomerCouponsAppState {

    const newState = { ...currentState } // Spread Operator: copy the current state to the new state

    switch (action.type) {
        case CustomerCouponsActionType.CustomerCouponsDownloaded:
            newState.customerCoupons = action.payload;
            break;
        case CustomerCouponsActionType.CustomerCouponAdded:
            newState.customerCoupons.push(action.payload);
            break;
        case CustomerCouponsActionType.CustomerCouponUpdated: {
            const index = newState.customerCoupons.findIndex(c => c.id === action.payload.id);
            newState.customerCoupons[index] = action.payload;
            break;
        }
        case CustomerCouponsActionType.CustomerCouponDeleted:
            newState.customerCoupons = newState.customerCoupons.filter(c => c.id !== action.payload);
            break;
    }
    
    return newState;

}