import { User } from "../dtos/user";
import { combineReducers } from "redux";
import { loginReducer } from "./login-reducer";
import { updateReducer } from "./update-user-reducer"
import { newUserReducer } from "./new-user-reducer"
import { NewUser } from "../dtos/new-user";
import { userReducer } from "./user-reducer"

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

export interface IUserState {
    authUser: User;
    errorMessage: string;
}

export interface IState {
    login: ILoginState;
    update: IUpdateState;
    newUser: INewUserState;
    user: IUserState

}



export const state = combineReducers<IState>({
     login: loginReducer,
     update: updateReducer,
     newUser: newUserReducer,
     user: userReducer
 });

 
