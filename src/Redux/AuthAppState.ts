import { UserModel } from "../Models/dto/UserModel";

export class AuthAppState {
    public user: UserModel = null;
    public constructor() {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if(storedUser) {
            this.user = storedUser;
        }
    }
}

export enum AuthActionType {
    Login = "Login",
    Logout = "Logout"
}

export interface AuthAction {
    type: AuthActionType;
    payload?: any; // ? for logout
}

export function loginAction(user: UserModel): AuthAction {
    return { type: AuthActionType.Login, payload:user};
}

export function logoutAction(): AuthAction {
    return { type: AuthActionType.Logout};
}

export function authReducer(currentState: AuthAppState = new AuthAppState(),action:AuthAction): AuthAppState{

    const newState = {...currentState} 

    switch(action.type){
        case AuthActionType.Login: // With payload
            newState.user = action.payload;
            localStorage.setItem("user", JSON.stringify(newState.user)); // Saving in the session storage
            break;
        case AuthActionType.Logout: // No payload
            newState.user = null;
            localStorage.removeItem("user");
            break;
    }

    return newState;
}

