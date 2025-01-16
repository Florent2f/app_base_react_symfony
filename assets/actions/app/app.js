import axios from 'axios';
import {localDomaine} from '../../env'
import {USER_AUTHENTICATED_START,USER_AUTHENTICATED_SUCESS,USER_AUTHENTICATED_FAILED}  from './types';
import {USER_LOGOUT_START,USER_LOGOUT_SUCESS,USER_LOGOUT_FAILED}  from './types';

export const getCurrentUser = () => dispatch => {
    dispatch({type: USER_AUTHENTICATED_START})
    axios({url: localDomaine + '/api/user'})
        .then(reponse => {
            dispatch({
                type: USER_AUTHENTICATED_SUCESS,
                data: reponse.data
            })
        })
        .catch(err => {
            dispatch({
                type: USER_AUTHENTICATED_FAILED,
                error: "Une erreur s'est produite." 
            })
            
        })
}

export const logout =  () => dispatch => {

    dispatch({type: USER_LOGOUT_START})
    axios({url: localDomaine + '/logout', method: 'post', data: null})
        .then(reponse => {
            dispatch({
                type: USER_LOGOUT_SUCESS,
                data: null
            })
        })
        .catch(err => {
            dispatch({
                type: USER_LOGOUT_FAILED,
                error: "Une erreur s'est produite." 
            })
            
        })
}