import { Coupon } from "../Models/Coupon";

// Step 1 - creating AppState and manage the collection of companies once and in a centeralized place.
export class CompanyCouponsAppState {
    public companyCoupons: Coupon[] = [];
}

// Step 2 - Define all possible action for your application state
export enum CompanyCouponsActionType {
    companyCouponsDownloaded = "companyCouponsDownloaded",
    companyCouponAdded = "companyCouponAdded",
    companyCouponUpdated = "companyCouponUpdated",
    companyCouponDeleted = "companyCouponDeleted"
}

// Step 3 - Define Action Interface to describe actionAction & payload if needed
export interface CompanyCouponAction {
    type: CompanyCouponsActionType;
    payload?: any;
}

// Step 4 - Export Action Creators functions that gets payload and return relevant Action
export function companyCouponsDownloadedAction(coupons: Coupon[]): CompanyCouponAction {
    return { type: CompanyCouponsActionType.companyCouponsDownloaded, payload: coupons };
}

export function companyCouponsAddedAction(coupon: Coupon): CompanyCouponAction {
    return { type: CompanyCouponsActionType.companyCouponAdded, payload: coupon };
}

export function companyCouponsUpdatedAction(coupon: Coupon): CompanyCouponAction {
    return { type: CompanyCouponsActionType.companyCouponUpdated, payload: coupon };
}

export function companyCouponsDeletedAction(id: number): CompanyCouponAction {
    return { type: CompanyCouponsActionType.companyCouponDeleted, payload: id };
}


// Step 5 - Reducer function perform the required action
export function companyCouponsReducer(currentState: CompanyCouponsAppState = new CompanyCouponsAppState(), action: CompanyCouponAction): CompanyCouponsAppState {

    const newState = { ...currentState } // Spread Operator: copy the current state to the new state

    switch (action.type) {
        case CompanyCouponsActionType.companyCouponsDownloaded:
            newState.companyCoupons = action.payload;
            break;
        case CompanyCouponsActionType.companyCouponAdded:
            newState.companyCoupons.push(action.payload);
            break;
        case CompanyCouponsActionType.companyCouponUpdated: {
            const index = newState.companyCoupons.findIndex(c => c.id === action.payload.id);
            newState.companyCoupons[index] = action.payload;
            break;
        }
        case CompanyCouponsActionType.companyCouponDeleted:
            newState.companyCoupons = newState.companyCoupons.filter(c => c.id !== action.payload);
            break;
    }
    
    return newState;

}