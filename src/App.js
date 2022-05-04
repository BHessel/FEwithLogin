import React, { useState, useEffect } from 'react';
import './App.css';
import {
  Routes,
  Route
} from 'react-router-dom'
import axios from 'axios';
import Home from './Components/Home.js'
import VideoContainer from './Components/VideoContainer.js'
import VidPlayer from './Presentational/Video'
import Banner from './Presentational/Banner'

// //Component imports
// import LoginForm from './Containers/LoginForm';
// import Favorites from './Containers/Favorites';
// import NotFound from './Presentational/NotFound';
// import Matches from './Containers/Matches';
// import { fetchFavorites } from './Containers/import';

const App = () => {

  const [user, setUser] = useState({})
  const [loggedInStatus, setLoggedInStatus] = useState('not_logged_in')
  const [allUsers, setAllUsers] = useState([]);

  const handleLogin = (data) => {
    setLoggedInStatus('logged_in')
    setUser(data.user)
  }

  const handleLogout = () => {
    setLoggedInStatus('not_logged_in')
    setUser({})
  }

  //check Login Status
  useEffect(() => {
    const checkLoginStatus = () => {
      axios.get('http://localhost:3000/logged_in',
        { withCredentials: true })
        .then(response => {
          console.log('logged in?:', response)
          if (response.data.logged_in && loggedInStatus === 'not_logged_in') {
            setLoggedInStatus('logged_in')
            setUser(response.data.user)
        } else if (!response.data.logged_in && loggedInStatus === 'logged_in') {
          setLoggedInStatus('not_logged_in')
          setUser({})
        }
      })
        .catch(error => {
          console.log('check login error?', error)
        })
    }
    return () => {
      checkLoginStatus()
    }
  }, [loggedInStatus])

  //get all Users
  useEffect(() => {
    const getAllUsers = async () => {
      let allUsersList = await axios.get('http://localhost:3000/users')
      console.log('allUsers response is:', allUsersList)
      setAllUsers(allUsersList.data)
  }
    return () => {
      getAllUsers()
    };
  }, []);


  return (
    <div className="App">
      <div className='main-grid'>
        <Banner 
          user={user}
          handleLogout={handleLogout}
        />
      </div>

      <div className='body-container'>
        <Routes>
          
          <Route
          //Home is for login/registration
          //apply boolean, if notLoggedIn ? Home : VideoContainer
            path={"/"}
            element={
              <Home
                loggedInStatus={loggedInStatus}
                handleLogin={handleLogin}
                handleLogout={handleLogout}
              />
            }
          />

          <Route
          //VideoContainer is Dashboard aka logged-in home
            path={"/VideoContainer"}
            element={
              <VideoContainer
                loggedInStatus={loggedInStatus}
                allUsers={allUsers}
                user={user}
              />
            }
          />

          {/* <Route
            path={'/Favorites'}
            element={
              <Favorites
                
              />} 
          /> */}

          {/* <Route
            path={'/Matches'}
            element={
              <Matches />
            } 
          />  */}
          
          {/* routes to page w/ single video @ full size */}
          <Route
            path={'/VidPlayer'}
            element={
              <VidPlayer />
            } 
          />

          {/* <Route
            component={NotFound}
          /> */}

        </Routes>
      </div>
    </div>
  );
}

export default App;
