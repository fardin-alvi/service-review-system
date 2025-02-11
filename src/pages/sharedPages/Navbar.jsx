import React from 'react';
import { FaServicestack } from "react-icons/fa";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    

    const links = <>
        <NavLink to='/' className={({ isActive }) => `text-lg px-3 ${isActive ? 'text-purple-600 text-xl' : 'text-white'}`}>Home</NavLink>
        <NavLink to='/service' className={({ isActive }) => `text-lg px-3 ${isActive ? 'text-purple-600 text-xl' : 'text-white'}`}>Service</NavLink>
        <a href="#contact" className="text-lg px-3 text-white">Contact</a>
        
        {/* {
            !user && <>
                <NavLink to='/login' className={({ isActive }) => `md:hidden text-black border rounded-lg text-lg border-gray-300 p-2 ${isActive ? 'bg-purple-600 text-white' : ''}`}>LogIn</NavLink>
                <NavLink to='/register' className={({ isActive }) => `md:hidden border rounded-lg text-lg text-black border-gray-300 p-2 ${isActive ? 'bg-purple-600 text-white' : ''}`}>Register</NavLink>
            </>
        } */}
        {
            user && <>
                <NavLink to='/addservice' className={({ isActive }) => `text-lg px-3 ${isActive ? 'text-purple-600 text-xl' : 'text-white'}`}>Add Service</NavLink>
                <NavLink to='/myservice' className={({ isActive }) => `text-lg px-3 ${isActive ? 'text-purple-600 text-xl' : 'text-white'}`}>My Service</NavLink>
                <NavLink to='/myreview' className={({ isActive }) => `text-lg px-3 ${isActive ? 'text-purple-600 text-xl' : 'text-white'}`}>My Review</NavLink>
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
        <div className="navbar text-white px-12 mx-auto sticky top-0 z-[1000] bg-gray-800">
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
                        className="menu menu-sm dropdown-content bg-base-100 rounded-lg z-50 mt-3 w-52 p-2 shadow">
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