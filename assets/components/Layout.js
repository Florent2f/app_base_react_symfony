import React, { Fragment, useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux'
import Navbar from './Navbar';
import * as app_actions from '../actions/app/app'
import store from '../store'

const Layout = (props) => {

    // console.log(store.getState().app.user);

    // Init fetch dispathes
    const dispatch = useDispatch();
    const getCurrentUser = useCallback(() => dispatch(app_actions.getCurrentUser()),[dispatch]);

    // Start fetch all store data
    useEffect(() => {
        getCurrentUser();
    }, [])
   

    return(
        <Fragment>
            <Navbar />
            {props.children}
        </Fragment>
    )

};

export default connect(null)(Layout);