import { User } from "../dtos/user"
import { AnyAction } from "redux"
import { loginActionTypes } from "../actions/login-action"
import { newUserActionTypes } from "../actions/new-user-action"
import { INewUserState } from "."

const initialState: INewUserState = {
    // @ts-ignore
    authUser: (null as User),
    errorMessage: ''
}

export const newUserReducer = (state: INewUserState = initialState, action: AnyAction) => {

    switch (action.type) {
        case newUserActionTypes.SUCCESSFUL_REGISTRATION:
            return {
                ...state,
                authUser: action.payload
            }

        case newUserActionTypes.BAD_REQUEST:
        case newUserActionTypes.INTERNAL_SERVER_ERROR:
            return {
                ...state,
                errorMessage: action.payload
            }

        default:
            return state;

    }

}
