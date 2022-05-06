import React from 'react';
import Registration from './auth/Registration';
import Login from './auth/Login'
// import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Home = (props) => {

    const { loggedInStatus, handleLogin, handleLogout } = props
    // let navigate = useNavigate()

    const handleSuccessfulAuth = (data) => {
        // console.log(data)
        handleLogin(data)
        // navigate('/VideoContainer')
    }

    // const handleLogoutClick = () => {
    //     axios.delete('http://localhost:3000/logout', { withCredentials: true })
    //     .then(response => {
    //         // console.log('handleLogoutResponse', response)
    //         handleLogout()
    //     })
    //     .catch(error => {
    //         console.log('logout error?', error)
    //     })
    // }

    return (
        <div>
            <h2>loggedInStatus: {loggedInStatus}</h2>
            <div className="create-user left-side">
                <Registration 
                    handleSuccessfulAuth={handleSuccessfulAuth}    
                />
            </div>
            <div className="login-form right-side">
                <Login 
                    handleSuccessfulAuth={handleSuccessfulAuth}
                />
            </div>
        </div>
    );
}

export default Home;