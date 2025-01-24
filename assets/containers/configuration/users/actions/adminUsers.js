import axios from 'axios'
import {localDomaine} from '../../../../env'

export const user_create = async (data) => {

    const url = localDomaine + '/admin/users/add';
    const res = {newUser: null, error: null};
    await axios({url: url, method: 'post', data: data})
        .then((response) => {
            res.newUser = response.data.newUser;
        })
        .catch((error) => {
            res.error = 'Une erreur est servenue.'
        })
    return res;
    
}

