import React, { Fragment, useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './styles/Security.scss'
import {localDomaine} from '../env'

const SignUp = () => {

    const [name, setName] = useState('Florent');
    const [login, setLogin] = useState('login@gmail.com');
    const [password, setPassword] = useState('password1');

    useEffect(() => {
        document.title = 'Sign Up';
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {login: login, password: password}
        await axios({url: localDomaine + '/security/registration', method: 'post', data: payload})
            .then(response => {
                console.log(response.data.user_created);
                console.log('user created');
            })
            .catch(error => {
                console.log(error);
                console.log('user not created');
            })
        
        console.log('ok');
        
    }

    const handleName = () => {
        setName(e.target.value);
    }

    const handleLogin = (e) => {
        setLogin(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    return(

        <Fragment>
            <div className='container_react'>
                <div className='signform'>
                    <h1>Sign Up</h1>

                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" defaultValue={name} onChange={handleName} />
                        <br/><br/>

                        <label htmlFor="login">Login:</label>
                        <input type="text" id="login" name="login" defaultValue={login} onChange={handleLogin} />
                        <br/><br/>

                        <label htmlFor="password">Password:</label>
                        <input type="text" id="password" name="password" defaultValue={password} onChange={handlePassword} />
                        <br/><br/>

                        <button type="submit">Sign up</button>
                    </form>

                    <p>Already have an account? <Link to='/signin'>Sign in</Link></p>
                </div>
            </div>
        </Fragment>
    

    )

};

export default SignUp;