import React from 'react';
import Registration from './auth/Registration';
import Login from './auth/Login'

const Home = (props) => {

    const { loggedInStatus, handleLogin, handleLogout } = props

    const handleSuccessfulAuth = (data) => {
        handleLogin(data)
    }

    return (
        <>
            <div className="bg-flex-wrapper-2">
                <Registration 
                    handleSuccessfulAuth={handleSuccessfulAuth}    
                />
                <Login 
                    handleSuccessfulAuth={handleSuccessfulAuth}
                />
            </div>
        </>
    );
}

export default Home;