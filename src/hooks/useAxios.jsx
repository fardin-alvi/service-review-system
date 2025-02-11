import React, { useEffect } from 'react';
import axios from 'axios';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom'


const instance = axios.create({
    baseURL: 'http://localhost:6500',
    withCredentials: true,
});

const useAxios = () => {
    const { logout } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        instance.interceptors.response.use(response => {
            return response;
        }, error => {
            if (error.response.status === 401 || error.response.status === 403) {
                logout()
                    .then(() => {
                        navigate('login')
                    }).catch(err => {
                        console.log(err);
                    })

            }
            return Promise.reject(error)
        })
    }, [])
    return instance;
};

export default useAxios;
