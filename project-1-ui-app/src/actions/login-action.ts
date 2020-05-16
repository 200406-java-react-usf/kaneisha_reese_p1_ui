import { Dispatch } from "redux"
import { authenticate } from "../remote/auth-service"

export const loginActionTypes = {
    SUCCESSFUL_LOGIN: 'ERS_SUCCESSFUL_LOGIN',
    BAD_REQUEST: 'ERS_BAD_REQUEST',
    INVALID_CREDENTIALS: 'ERS_BAD_CREDENTIALS',
    INTERNAL_SERVER_ERROR: 'ERS_INTERNAL_SERVR_ERROR'
}

export const loginAction = (username:string, password:string) => async (dispatch: Dispatch) => {
    
    try {

        let authUser = await authenticate(username, password);
        dispatch({
            type: loginActionTypes.SUCCESSFUL_LOGIN,
            payload: authUser
        });

    } catch(e) {

        let status = e.response.status;
        if (status === 400) {
            dispatch({
                type: loginActionTypes.BAD_REQUEST,
                payload: e.response.data.message
            });
        } else if (status === 401) {
            dispatch({
                type: loginActionTypes.INVALID_CREDENTIALS,
                payload: e.response.data.message
            });
        } else {
            dispatch({
                type: loginActionTypes.INTERNAL_SERVER_ERROR,
                payload: e.response.data.message || 'Ooops! Cannot reach the server!'
            });
        }
    }
}