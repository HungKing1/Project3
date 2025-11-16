import React from 'react'
import { useAuthContext } from '../context/AuthContext'
import { Navigate, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const ProtectedRoute = ({children}) => {
    const {accessToken} = useAuthContext()
    if(!accessToken) {
        toast.error("Vui lòng đăng nhập")
        return <Navigate to="/dang-nhap" replace />;    
    }
    return children;
}

export default ProtectedRoute