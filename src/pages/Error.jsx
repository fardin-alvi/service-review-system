import React from 'react';
import error from '../assets/error.png'
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <p className='text-3xl font-semibold'>Something Wrong</p>
            <img className='w-72 h-72' src={error} alt="" />
            <Link to='/'>Go Back</Link>
        </div>
    );
};

export default Error;