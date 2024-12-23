import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from '../hooks/useAuth';


const Myreview = () => {
    const { user } = useAuth()
    useEffect(() => {
        axios.get(`http://localhost:6500/myreview/${user?.email}`)
            .then(res => {
            console.log(res.data);
        })
    },[])
    return (
        <div>
            <p>Review :</p>
        </div>
    );
};

export default Myreview;