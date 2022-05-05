import React from 'react';
import Registration from './auth/Registration';
import Login from './auth/Login'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Home = (props) => {

    const { loggedInStatus, handleLogin, handleLogout } = props
    let navigate = useNavigate()

    const handleSuccessfulAuth = (data) => {
        // console.log(data)
        handleLogin(data)
        navigate('/VideoContainer')
    }

    const handleLogoutClick = () => {
        axios.delete('http://localhost:3000/logout', { withCredentials: true })
        .then(response => {
            // console.log('handleLogoutResponse', response)
            handleLogout()
        })
        .catch(error => {
            console.log('logout error?', error)
        })
    }

    return (
        <div>
            <h1>Home</h1>
            <h2>Status: {loggedInStatus}</h2>
            <Registration 
                handleSuccessfulAuth={handleSuccessfulAuth}    
            />
            <Login 
                handleSuccessfulAuth={handleSuccessfulAuth}
            />
            <button onClick={handleLogoutClick}>
                Logout
            </button>
        </div>
    );
}

export default Home;