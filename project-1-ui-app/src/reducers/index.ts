import { User } from "../dtos/user";
import { combineReducers } from "redux";
import { loginReducer } from "./login-reducer";

import { newUserReducer } from "./new-user-reducer"
import { NewUser } from "../dtos/new-user";


export interface ILoginState {
    authUser: User;
    errorMessage: string;
}

export interface IUpdateState {
    errorMessage: string;
}

export interface INewUserState {
    authUser: User;
    newUser: NewUser; 
    errorMessage: string;
}


export interface IState {
    login: ILoginState;
    newUser: INewUserState;


}



export const state = combineReducers<IState>({
     login: loginReducer,
     newUser: newUserReducer
 });

 
