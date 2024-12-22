import React from 'react';
import Navbar from '../pages/sharedPages/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../pages/sharedPages/Footer';

const MainLayout = () => {
    return (
        <div>
            <nav className='bg-gray-900 text-white'>
                <Navbar/>
            </nav>
            <Outlet />
            <Footer/>
        </div>
    );
};

export default MainLayout;