import { Company } from "../Models/Company";

// Step 1 - creating AppState and manage the collection of companies once and in a centeralized place.
export class CompaniesAppState {
    public companies: Company[] = [];
}

// Step 2 - Define all possible action for your application state
export enum CompaniesActionType {
    CompaniesDownloaded = "CompaniesDownloaded",
    CompanyAdded = "CompanyAdded",
    CompanyUpdated = "CompanyUpdated",
    CompanyDeleted = "CompanyDeleted"
}

// Step 3 - Define Action Interface to describe actionAction & payload if needed
export interface CompanyAction {
    type: CompaniesActionType;
    payload?: any;
}


// Step 4 - Export Action Creators functions that gets payload and return relevant Action
export function companiesDownloadedAction(companies: Company[]): CompanyAction {
    return { type: CompaniesActionType.CompaniesDownloaded, payload: companies };
}

export function companiesAddedAction(company: Company): CompanyAction {
    return { type: CompaniesActionType.CompanyAdded, payload: company };
}

export function companiesUpdatedAction(company: Company): CompanyAction {
    return { type: CompaniesActionType.CompanyUpdated, payload: company };
}

export function companiesDeletedAction(id: number): CompanyAction {
    return { type: CompaniesActionType.CompanyDeleted, payload: id };
}


// Step 5 - Reducer function perform the required action
export function companiesReducer(currentState: CompaniesAppState = new CompaniesAppState(), action: CompanyAction): CompaniesAppState {

    const newState = { ...currentState } // Spread Operator: copy the current state to the new state

    switch (action.type) {
        case CompaniesActionType.CompaniesDownloaded:
            newState.companies = action.payload;
            break;
        case CompaniesActionType.CompanyAdded:
            newState.companies.push(action.payload);
            break;
        case CompaniesActionType.CompanyUpdated: {
            const index = newState.companies.findIndex(c => c.id === action.payload.id);
            newState.companies[index] = action.payload;
            break;
        }
        case CompaniesActionType.CompanyDeleted:
            newState.companies = newState.companies.filter(c => c.id !== action.payload);
            break;
    }
    
    return newState;

}

