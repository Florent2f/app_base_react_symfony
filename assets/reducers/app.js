import {USER_AUTHENTICATED_START,USER_AUTHENTICATED_SUCESS,USER_AUTHENTICATED_FAILED} from '../actions/app/types'
import {USER_LOGOUT_START,USER_LOGOUT_SUCESS,USER_LOGOUT_FAILED} from '../actions/app/types'

const initialState = {
    user: [],
    error: false
}

const reducer = (state = initialState, action) => {

    switch(action.type) {
        
        case USER_AUTHENTICATED_START: {
            return({
                ...state
            })
        }

        case USER_AUTHENTICATED_SUCESS: {
            return({
                ...state,
                user: action.data
            })
        }

        case USER_AUTHENTICATED_FAILED: {
            return({
                ...state,
                error: action.error
            })
        }

        case USER_LOGOUT_START: {
            return({
                ...state
            })
        }

        case USER_LOGOUT_SUCESS: {
            return({
                ...state,
                user: []
            })
        }

        case USER_LOGOUT_FAILED: {
            return({
                ...state,
                error: action.error
            })
        }

        default: {
            return state;
        }
    }

}

export default reducer;