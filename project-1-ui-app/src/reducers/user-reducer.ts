import { IUserState } from ".";
import { User } from "../dtos/user";
import { AnyAction } from "redux";
import { UserActionTypes } from "../actions/user-actions"


const initialState: IUserState = {
    //@ts-ignore
    authUser: (null as User),
    errorMessage: ''
}

export const userReducer = (state: IUserState = initialState, action: AnyAction) => {

    switch(action.type) {
        case UserActionTypes.SUCCESSFUL:
            return {
                ...state,
    
            }
        case UserActionTypes.BAD_REQUEST:
        case UserActionTypes.INTERNAL_SERVER_ERROR:
            return {
                ...state,
                errorMessage: action.payload
            }
        default:
            return state;
    }
}