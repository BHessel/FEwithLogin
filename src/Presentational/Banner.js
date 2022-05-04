import React from 'react'
import { useNavigate } from 'react-router-dom'

const Banner = ({ user, handleLogout }) => {

    let navigate = useNavigate()

    const logout = () => {
        handleLogout()
        navigate('/')
    } 


    return (
        <div className='banner-box'>
            
            <div className='logout'>
                {user ? (
                    <button className='logout-btn' onClick={logout}>
                        Logout
                    </button>
                ) : (
                    <button className='get-started-btn'>
                        Get Started
                    </button>
                )}
            </div>
            
        </div>
    )
}

export default Banner