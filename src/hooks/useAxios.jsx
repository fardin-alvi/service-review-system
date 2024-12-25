import React, { useEffect } from 'react';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Logout from '../Functionallity/Logout';
import Navigate from '../Functionallity/Navigate';

const instance = axios.create({
    baseURL: 'http://localhost:6500',
    withCredentials: true,
});

const useAxios = () => {
    useEffect(() => {
        const interceptor = instance.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401 || error.response?.status === 403) {
                    Logout()
                    Navigate()
                }
                return Promise.reject(error);
            }
        );
    }, [Logout, Navigate]);

    return instance;
};

export default useAxios;
