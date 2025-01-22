// import axios from 'axios'
// import {localDomaine} from '../../../env'
// import {USER_CREATE_START, USER_CREATE_SUCESS, USER_CREATE_FAILED} from './adminUsersTypes';

// export const user_create = (data) => dispatch => {

//     const url = localDomaine + '/admin/users/add';
//     console.log(data);

//     dispatch({type: USER_CREATE_START})
//     axios({url: url, method: 'post', payload: data})
//         .then((response) => {
//             console.log('ok');
//             dispatch({type: USER_CREATE_SUCESS})
//         })
//         .catch((error) => {
//             console.log('Une erreur est servenue.');
//             dispatch({type: USER_CREATE_FAILED})
//         })

// }

