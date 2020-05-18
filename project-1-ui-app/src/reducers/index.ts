import { User } from "../dtos/user";
import { combineReducers } from "redux";
import { loginReducer } from "./login-reducer";
import { updateReducer } from "./update-user-reducer"


export interface ILoginState {
    authUser: User;
    errorMessage: string;
}

export interface IUpdateState {
    errorMessage: string;
}


export interface IState {
    login: ILoginState;
    update: IUpdateState;

}

export const state = combineReducers<IState>({
     login: loginReducer,
     update: updateReducer
 });
