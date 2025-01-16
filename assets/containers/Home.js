import React, {Fragment, useState, useEffect} from "react";
import { connect } from "react-redux";

const Home = ({app}) => {

    useEffect(() => {
        document.title = 'Accueil';
    }, []);

    // console.log(store.getState().app.user);

    return(
        <div>
            <p>Home page</p>
            <p>Login : {app.user.userName}</p>
            <p>User : {app.user.user}</p>
        </div>
    )

};

const mapStateToProps = state => ({
    app: state.app
});

export default connect(mapStateToProps)(Home);