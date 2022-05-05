import React from 'react';
import logo from '../Images/netflixMMlogoSMALL.png'


const Banner = (props) => {

    const { user, setUser, handleLogout } = props

    return (
        <div className='banner-box'>

            <div className='logoContainer'>
                <img src={logo} className='logoIMG'/>
            </div>
            
            <div className='logout'>
                {user ? (
                    <button className='logout-btn' onClick={handleLogout}>
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
