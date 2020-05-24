import { User } from "../dtos/user";
import { combineReducers } from "redux";
import { loginReducer } from "./login-reducer";
import { userReducer } from "./user-reducer";
import { logoutReducer } from "./logout-reducer";


export interface ILoginState {
    authUser: User;
    errorMessage: string;
}
export interface ILogoutState {
   
    errorMessage: string;
}
export interface IUpdateState {
    errorMessage: string;
}

export interface IUserState {
    authUser: User;
    users: User[]; 
    errorMessage: string;
}



export interface IState {
    login: ILoginState;
    user: IUserState;
    logout: ILogoutState



}



export const state = combineReducers<IState>({
     login: loginReducer,
     user: userReducer,
     logout: logoutReducer
 });

 
