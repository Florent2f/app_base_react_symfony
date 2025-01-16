import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux'

import Layout from './components/Layout';
import Home from './containers/Home';
import SignUp from './containers/SignUp';
import SignIn from './containers/SignIn';
import NoPage from './containers/NoPage';
import store from './store';

const App = () => {

    return(
        <Provider store={store}>
            <Router>
                <Layout>
                    <Routes>
                        <Route exact path="/" element={<Home/>}/>
                        <Route exact path="signup" element={<SignUp/>}/>
                        <Route exact path="signin" element={<SignIn/>}/>
                        <Route path="*" element={<NoPage />} />
                    </Routes>
                </Layout>
            </Router>
        </Provider>
        
    )
}

export default App;