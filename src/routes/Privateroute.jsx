import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { FadeLoader } from 'react-spinners';

const Privateroute = ({children}) => {
    const location = useLocation()
    const { user, loading } = useAuth()

    if (loading) {
        return (<div className='flex justify-center items-center'>
            <FadeLoader />
        </div>)
    }
    if (user) {
        return children;
    }
    return <Navigate state={location.pathname} to="/login"></Navigate>
};

export default Privateroute;