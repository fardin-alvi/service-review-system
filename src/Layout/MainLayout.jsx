import React from 'react';
import Navbar from '../pages/sharedPages/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../pages/sharedPages/Footer';

const MainLayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default MainLayout;