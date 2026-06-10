import React, {useState,useEffect} from 'react';

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
    
        useEffect(() => {
    const expiryTime = localStorage.getItem('expiryTime');

    if (!expiryTime) {
        return;
    }

    const remainingTime = +expiryTime - Date.now();

    if (remainingTime <= 0) {
        logoutHandler();
        return;
    }

    const timer = setTimeout(logoutHandler, remainingTime);

    return () => {
        clearTimeout(timer);
    };
    }, [token]);

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