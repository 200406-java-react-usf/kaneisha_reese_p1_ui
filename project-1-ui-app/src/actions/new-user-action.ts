import { NewUser } from "../dtos/new-user"
import { Dispatch } from "redux"
import { addUser } from "../remote/user-service"


export const newUserActionTypes = {
    SUCCESSFUL_REGISTRATION: 'ERS_SUCCESSFUL_REGISTRATION',
    BAD_REQUEST: 'ERS_BAD_REQUEST',
    INTERNAL_SERVER_ERROR: 'ERS_INTERNAL_SERVER_ERROR'
}

export const newUserAction = (newUser: NewUser) => async (dispatch: Dispatch) => {

    try {

        let registeredUser = await addUser(newUser.username, newUser.password, newUser.firstName, newUser.lastName, newUser.email, newUser.role);
        dispatch({
            type: newUserActionTypes.SUCCESSFUL_REGISTRATION,
            payload: registeredUser
        });
        

    } catch (e) {

        let status = e.response.data.statusCode;
        if (status === 400) {
            dispatch({
                type: newUserActionTypes.BAD_REQUEST,
                payload: e.response.data.message
            });
        } else {
            dispatch({
                type: newUserActionTypes.INTERNAL_SERVER_ERROR,
                payload: e.response.data.message || 'Uh oh! We could not reach the server!'
            });
        }

    }

}
