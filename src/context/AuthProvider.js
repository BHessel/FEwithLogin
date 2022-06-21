import { createContext, useContext, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from "./useLocalStorage";
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage("user", {email: 'ben@dev.com', password: 'asdf'});
    const navigate = useNavigate()

    useEffect(() => {
    const checkLoginStatus = () => {
      axios.get(`https://netflix-movie-matcher.herokuapp.com/logged_in`,
      { withCredentials: true })
      .then(response => {
        console.log('logged in?:', response)
          if (response.data.logged_in === 'not_logged_in') {
            // setLoggedInStatus('logged_in')
            setUser(response.data.user)
          } else if (!response.data.logged_in === 'logged_in') {
            // setLoggedInStatus('not_logged_in')
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
  }, [])

    const login = async (data) => {
        console.log(data)
        setUser(data)
        navigate("/VideoContainer", { replace: true })
    }

    const logout = () => {
        setUser(null)
        navigate("/", { replace: true })
    }

    const value = useMemo(() => ({
            user,
            login,
            logout
        }),
    [user]
    )
    return (
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext)
}