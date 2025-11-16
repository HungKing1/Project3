import axios from 'axios'
import React, { createContext, use, useContext, useState } from 'react'
import Cookies from 'js-cookie'

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token') || '')
    // if(accessToken) {
    //     console.log(1)
    // } else {
    //     console.log(0)
    // }
    const value = {
        isLoggedIn, setIsLoggedIn,
        accessToken, setAccessToken
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)