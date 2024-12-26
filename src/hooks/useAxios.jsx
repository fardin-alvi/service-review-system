import React from 'react';
import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://deck-serve-server.vercel.app',
    withCredentials: true,
});

const useAxios = () => {
    return instance;
};

export default useAxios;
