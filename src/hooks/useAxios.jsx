import React, { useEffect } from 'react';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const instance = axios.create({
    baseURL: 'http://localhost:6500',
    withCredentials: true,
});

const useAxios = () => {
    const { setLoading, logout } = useAuth(); // Access context values
    const navigate = useNavigate(); // Navigation function

    useEffect(() => {
        const interceptor = instance.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401 || error.response?.status === 403) {
                    setLoading(true);
                    logout();
                    navigate('/login');
                }
                return Promise.reject(error);
            }
        );
        return () => {
            instance.interceptors.response.eject(interceptor);
        };
    }, [setLoading, logout, navigate]);

    return instance;
};

export default useAxios;
