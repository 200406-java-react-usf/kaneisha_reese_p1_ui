import { NewUser } from "../dtos/new-user"
import { Dispatch } from "redux"
import { addUser } from "../remote/user-service"


export const userActionTypes = {
    SUCCESSFUL_ADD_USER: 'ERS_SUCCESSFUL_ADD_USER',
    SUCCESSFUL_MOD_USER: 'ERS_SUCCESSFUL_MOD_USER',
    SUCCESSFUL_DELETE_USER: 'ERS_SUCCESSFUL_DELETE_USER',
    BAD_REQUEST: 'ERS_BAD_REQUEST',
    INTERNAL_SERVER_ERROR: 'ERS_INTERNAL_SERVER_ERROR'
}

export const userAction = (newUser: NewUser) => async (dispatch: Dispatch) => {

    try {

        let registeredUser = await addUser(newUser.username, newUser.password, newUser.firstName, newUser.lastName, newUser.email, newUser.role);
        dispatch({
            type: userActionTypes.SUCCESSFUL_ADD_USER,
            payload: registeredUser
        });
        

    } catch (e) {

        let status = e.response.data.statusCode;
        if (status === 400) {
            dispatch({
                type: userActionTypes.BAD_REQUEST,
                payload: e.response.data.message
            });
        } else {
            dispatch({
                type: userActionTypes.INTERNAL_SERVER_ERROR,
                payload: e.response.data.message || 'Uh oh! We could not reach the server!'
            });
        }

    }

}
