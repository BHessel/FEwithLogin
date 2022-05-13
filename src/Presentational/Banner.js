import React from 'react';
import logo from '../Images/netflixMMlogoSMALL.png'
import axios from 'axios';


const Banner = (props) => {

    const { user, setUser, handleLogout } = props

    const handleLogoutClick = () => {
        axios.delete('https://netflix-movie-matcher.herokuapp.com/logout', { withCredentials: true })
        .then(response => {
            handleLogout()
        })
        .catch(error => {
            console.log('logout error?', error)
        })
    }

    return (
        <div className='banner-box'>

            <div className='logoContainer'>
                <img src={logo} className='logoIMG'/>
            </div>
            
            <div className='logout'>
                {user ? (
                    <button className='logout-btn' onClick={handleLogoutClick}>
                        Logout
                    </button>
                ) : (
                    <button className='get-started-btn'>
                        Get Started
                    </button>
                )}
            </div>
            
        </div>
    );
}

export default Banner;
