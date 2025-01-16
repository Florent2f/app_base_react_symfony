import React, { Fragment, useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios'
import './styles/Security.scss'
import {localDomaine} from '../env'
import {USER_AUTHENTICATED_START,USER_AUTHENTICATED_SUCESS,USER_AUTHENTICATED_FAILED}  from '../actions/app/types';

const SignIn = () => {

    const [username, setUsername] = useState('login@gmail.com');
    const [password, setPassword] = useState('password1');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Sign In';
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault()
        const payload = {username: username, password: password}

        dispatch({type: USER_AUTHENTICATED_START})
        axios({url: localDomaine + '/api/login', method: 'post', data: payload})
            .then(reponse => {
                dispatch({
                    type: USER_AUTHENTICATED_SUCESS,
                    data: reponse.data
                })
                navigate('/')
                
            })
            .catch(err => {
                dispatch({type: USER_AUTHENTICATED_FAILED})
                console.log(err.message);
                
            })
        
    }

    const handleLogin = (e) => {
        setUsername(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    return(

        <Fragment>
            <div className='container_react'>
                <div className='signform'>
                    <h1>Sign In</h1>

                    <form onSubmit={handleSubmit}>

                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" defaultValue={username} onChange={handleLogin}  />
                        <br/><br/>

                        <label htmlFor="password">Password:</label>
                        <input type="text" id="password" name="password" defaultValue={password} onChange={handlePassword} />
                        <br/><br/>

                        <button type="submit">Sign In</button>
                    </form>

                    <p>Don't have an account? <Link to='/signup'>Sign up</Link></p>
                </div>
            </div>
        </Fragment>
    

    )

};

export default SignIn;