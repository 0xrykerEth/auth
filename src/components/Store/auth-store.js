import React, {useState} from 'react';

const AuthContext = React.createContext({
    token : '',
    isLoggedIn : false,
    login : (token) => {},
    logOut : () => {}
})



export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('token');
    const [token,setToken] = useState(initialToken);

    const isUserLoggedIn = !!token;

    const loginHandler = (token) => {
        setToken(token)
        localStorage.setItem('token',token)
    }

    const logoutHandler = () => {
        setToken(null)
        localStorage.removeItem('token')
    }

    const contextValue = {
        token : token,
        isLoggedIn : isUserLoggedIn,
        login : loginHandler,
        logOut : logoutHandler,
    }

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext;