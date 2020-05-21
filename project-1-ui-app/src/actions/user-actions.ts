import { NewUser } from "../dtos/new-user"
import { Dispatch } from "redux"
import { getUsers } from "../remote/user-service"
import { loginActionTypes } from "./login-action"

export const UserActionTypes = {
    SUCCESSFUL: 'SUCCESSFULLY_GRABBED_DATA',
    BAD_REQUEST: 'BAD_REQUEST',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR'
}

export const userAction = (newUser: NewUser) => async (dispatch: Dispatch) => {

    try {

        let retrievedUser = await getUsers();
        dispatch({
            type: UserActionTypes.SUCCESSFUL,
            payload: retrievedUser
        });
        

    } catch (e) {

        let status = e.response.data.statusCode;
        if (status === 400) {
            dispatch({
                type: UserActionTypes.BAD_REQUEST,
                payload: e.response.data.message
            });
        } else {
            dispatch({
                type: UserActionTypes.INTERNAL_SERVER_ERROR,
                payload: e.response.data.message || 'Uh oh! We could not reach the server!'
            });
        }

    }

}