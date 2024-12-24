import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

const instance = axios.create({
    baseURL: 'http://localhost:6500',
    withCredentials:true
});

const useAxios = () => {
    // const { logout } = useAuth()
    // const navigate = useNavigate()

    // useEffect(() => {
    //     instance.interceptors.response.use(res => {
    //         return res
    //     })
    // },[])
    return instance;
}
export default useAxios;