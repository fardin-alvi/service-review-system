import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { Authcontext } from '../provider/Authprovider';
import { signOut } from "firebase/auth";


const instance = axios.create({
    baseURL: 'http://localhost:6500',
    withCredentials:true
});

const useAxios = () => {
    useEffect(() => {
        instance.interceptors.response.use(res => {
            return res
        }, error => {
            if (error) {
                signOut
            }
        })
    },[])
    return instance;
}
export default useAxios;