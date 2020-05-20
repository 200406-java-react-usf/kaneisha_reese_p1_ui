
import { Dispatch } from "redux"
import { updateUser } from "../remote/user-service"
import { NewUser } from "../dtos/new-user"


export const updateActionTypes = {
    SUCCESSFUL_UPDATE: 'ERS_SUCCESSFUL_UPDATE',
    BAD_REQUEST: 'DEVBOARDS_BAD_REQUEST',
    INTERNAL_SERVER_ERROR: 'DEVBOARDS_INTERNAL_SERVER_ERROR'
}

export const updateAction = (newUser: NewUser) => async (dispatch: Dispatch) => {

    try {

        let updatedUser = await updateUser(newUser);
        dispatch({
            type: updateActionTypes.SUCCESSFUL_UPDATE,
            payload: updatedUser
        });

    } catch (e) {

        let status = e.response.data.statusCode;
        if (status === 400) {
            dispatch({
                type: updateActionTypes.BAD_REQUEST,
                payload: e.response.data.message
            });
        } else {
            dispatch({
                type: updateActionTypes.INTERNAL_SERVER_ERROR,
                payload: e.response.data.message || 'Uh oh! We could not reach the server!'
            });
        }

    }

}