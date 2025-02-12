import React, { useEffect, useState } from 'react';
import { FaServicestack } from "react-icons/fa";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";

const Navbar = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);
 

    const links = <>
        <NavLink to='/' className={({ isActive }) => `text-lg px-3 ${isActive ? 'text-purple-600 text-xl' : 'dark:text-white'}`}>Home</NavLink>
        <NavLink to='/service' className={({ isActive }) => `text-lg px-3 ${isActive ? 'text-purple-600 text-xl' : 'dark:text-white'}`}>Service</NavLink>
        <a href="#contact" className="text-lg px-3 dark:text-white">Contact</a>
        {
            user && <>
                <NavLink to='/addservice' className={({ isActive }) => `text-lg px-3 ${isActive ? 'text-purple-600 text-xl' : 'dark:text-white'}`}>Add Service</NavLink>
                <NavLink to='/myservice' className={({ isActive }) => `text-lg px-3 ${isActive ? 'text-purple-600 text-xl' : 'dark:text-white'}`}>My Service</NavLink>
                <NavLink to='/myreview' className={({ isActive }) => `text-lg px-3 ${isActive ? 'text-purple-600 text-xl' : 'dark:text-white'}`}>My Review</NavLink>
            </>
        }
    </>

    const handlelogout = () => {
        logout()
            .then(res => {
                navigate('/login');
            })
            .catch(err => {
            });
    };

    return (
        <div className="navbar text-white lg:px-12 md:px-5 mx-auto sticky top-0 z-[1000] bg-gray-800 dark:bg-black">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex="0" role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                               strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex="0"
                        className="menu menu-sm dropdown-content bg-base-100 text-black dark:bg-black rounded-lg z-50 mt-3 w-52 p-2 shadow ">
                        {links}
                    </ul>
                </div>
                <Link to='/' className="text-xl flex items-center gap-1 "><FaServicestack className='size-7' /><span className='pt-2'><span className='text-teal-700' >Deck</span>Serve</span></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 space-x-2 ">
                    {links}
                </ul>
            </div>
            <div className="navbar-end space-x-2">
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2 rounded-lg"
                >
                    {darkMode ? <MdDarkMode className="text-xl" /> : <CiLight className="text-xl" />}
                </button>
                {
                    user ?
                        <div className='flex items-center space-x-2'>
                            <Link to='/login' onClick={handlelogout} className={({ isActive }) => `text-lg px-3 ${isActive ? 'text-purple-600 text-xl' : 'text-white'}`}>Log Out</Link>
                            {user.photoURL ? (<img className="w-10 h-10 rounded-full object-cover" src={user.photoURL} alt="User" />) : ""
                            }
                        </div> : <div className='flex items-center gap-x-2 ' >
                            <NavLink to='/login' className={({ isActive }) => `text-lg px-2 ${isActive ? 'text-purple-600 text-xl' : 'text-white'}`}>Login</NavLink>
                            <NavLink to='/register' className={({ isActive }) => `text-lg px-2 ${isActive ? 'text-purple-600 text-xl' : 'text-white'}`}>Register</NavLink>
                        </div>
                }
            </div>
        </div>
    );
};

export default Navbar;