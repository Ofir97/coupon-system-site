import { Coupon } from "../Models/Coupon";

// Step 1 - creating AppState and manage the collection of companies once and in a centeralized place.
export class CouponsAppState {
    public coupons: Coupon[] = [];
}

// Step 2 - Define all possible action for your application state
export enum CouponsActionType {
    CouponsDownloaded = "CouponsDownloaded",
    CouponAdded = "CouponAdded",
    CouponUpdated = "CouponUpdated",
    CouponDeleted = "CouponDeleted"
}

// Step 3 - Define Action Interface to describe actionAction & payload if needed
export interface CouponAction {
    type: CouponsActionType;
    payload?: any;
}

// Step 4 - Export Action Creators functions that gets payload and return relevant Action
export function couponsDownloadedAction(coupons: Coupon[]): CouponAction {
    return { type: CouponsActionType.CouponsDownloaded, payload: coupons };
}

export function couponsAddedAction(coupon: Coupon): CouponAction {
    return { type: CouponsActionType.CouponAdded, payload: coupon };
}

export function couponsUpdatedAction(coupon: Coupon): CouponAction {
    return { type: CouponsActionType.CouponUpdated, payload: coupon };
}

export function couponsDeletedAction(id: number): CouponAction {
    return { type: CouponsActionType.CouponDeleted, payload: id };
}


// Step 5 - Reducer function perform the required action
export function couponsReducer(currentState: CouponsAppState = new CouponsAppState(), action: CouponAction): CouponsAppState {

    const newState = { ...currentState } // Spread Operator: copy the current state to the new state

    switch (action.type) {
        case CouponsActionType.CouponsDownloaded:
            newState.coupons = action.payload;
            break;
        case CouponsActionType.CouponAdded:
            newState.coupons.push(action.payload);
            break;
        case CouponsActionType.CouponUpdated: {
            const index = newState.coupons.findIndex(c => c.id === action.payload.id);
            newState.coupons[index] = action.payload;
            break;
        }
        case CouponsActionType.CouponDeleted:
            newState.coupons = newState.coupons.filter(c => c.id !== action.payload);
            break;
    }
    
    return newState;

}