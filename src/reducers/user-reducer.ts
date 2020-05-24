import { User } from "../dtos/user"
import { AnyAction } from "redux"
import { IUserState } from "."
import { userActionTypes } from "../actions/user-action"

const initialState: IUserState = {
    // @ts-ignore
    authUser: (null as User),
    errorMessage: '',
    users: []
}

export const userReducer = (state: IUserState = initialState, action: AnyAction) => {

    switch (action.type) {
        case userActionTypes.SUCCESSFUL_ADD_USER:
            return {
                ...state,
                users: [...state.users, action.payload]
            }

        case userActionTypes.BAD_REQUEST:
        case userActionTypes.INTERNAL_SERVER_ERROR:
            return {
                ...state,
                errorMessage: action.payload
            }

        default:
            return state;

    }

}
