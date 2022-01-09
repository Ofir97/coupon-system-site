import { Customer } from "../Models/Customer";

// Step 1 - creating AppState and manage the collection of companies once and in a centeralized place.
export class CustomersAppState {
    public customers: Customer[] = [];
}

// Step 2 - Define all possible action for your application state
export enum CustomersActionType {
    CustomersDownloaded = "CustomersDownloaded",
    CustomerAdded = "CustomerAdded",
    CustomerUpdated = "CustomerUpdated",
    CustomerDeleted = "CustomerDeleted"
}

// Step 3 - Define Action Interface to describe actionAction & payload if needed
export interface CustomerAction {
    type: CustomersActionType;
    payload?: any;
}

// Step 4 - Export Action Creators functions that gets payload and return relevant Action
export function customersDownloadedAction(customers: Customer[]): CustomerAction {
    return { type: CustomersActionType.CustomersDownloaded, payload: customers };
}

export function customersAddedAction(customer: Customer): CustomerAction {
    return { type: CustomersActionType.CustomerAdded, payload: customer };
}

export function customersUpdatedAction(customer: Customer): CustomerAction {
    return { type: CustomersActionType.CustomerUpdated, payload: customer };
}

export function customersDeletedAction(id: number): CustomerAction {
    return { type: CustomersActionType.CustomerDeleted, payload: id };
}

// Step 5 - Reducer function perform the required action
export function customersReducer(currentState: CustomersAppState = new CustomersAppState(), action: CustomerAction): CustomersAppState {

    const newState = { ...currentState }

    switch (action.type) {
        case CustomersActionType.CustomersDownloaded:
            newState.customers = action.payload;
            break;
        case CustomersActionType.CustomerAdded:
            newState.customers.push(action.payload);
            break;
        case CustomersActionType.CustomerUpdated: {
            const index = newState.customers.findIndex(c => c.id === action.payload.id);
            newState.customers[index] = action.payload;
            break;
        }
        case CustomersActionType.CustomerDeleted:
            newState.customers = newState.customers.filter(c => c.id !== action.payload);
            break;
    }
    
    return newState;

}