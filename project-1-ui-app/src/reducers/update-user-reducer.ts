import { IUpdateState } from '.';
import { User } from "../dtos/user"
import { AnyAction } from "redux"

import { updateActionTypes, updateAction } from "../actions/update-user-action"

const initialState: IUpdateState ={
    //@ts-ignore
    authUser: (null as User),
    errorMessage: ''

}

export const updateReducer = (state: IUpdateState = initialState, action: AnyAction) => {

    switch(action.type) {
        case updateActionTypes.SUCCESSFUL_UPDATE:
            return{
                ...state,
                
            }
            case updateActionTypes.BAD_REQUEST:
                case updateActionTypes.INTERNAL_SERVER_ERROR:
                    return {
                        ...state,
                        errorMessage: action.payload
                    }
        
                default:
                    return state;
    }
}