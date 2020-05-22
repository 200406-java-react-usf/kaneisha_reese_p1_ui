import { User } from "../dtos/user"
import { AnyAction } from "redux"
import { newUserActionTypes } from "../actions/new-user-action"
import { INewUserState } from "."
import { NewUser } from "../dtos/new-user"

const initialState: INewUserState = {
    // @ts-ignore
    authUser: (null as User),
    //@ts-ignore
    newUser: (null as NewUser),
    errorMessage: ''
}

export const newUserReducer = (state: INewUserState = initialState, action: AnyAction) => {

    switch (action.type) {
        case newUserActionTypes.SUCCESSFUL_REGISTRATION:
            return {
                ...state,
                newUser: action.payload

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
