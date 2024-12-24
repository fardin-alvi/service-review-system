import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import {toast} from 'react-hot-toast';
import axios from 'axios';
import useAxios from '../hooks/useAxios';

const Login = () => {
    const { login, setUser, singinWithGoogle } = useAuth()
    const [error, seterror] = useState('')
    const navigate = useNavigate()


    const handlelogin = (e) => {
        e.preventDefault()
        const form = e.target 
        const email = form.email.value 
        const password = form.password.value 

        login(email, password)
            .then(res => {
                setUser(res.user)
                navigate('/')
                toast.success('Login Successfully')
            })
            .catch(error => {
                seterror('Wrong Credential')
        })
    }
    const handleGoogle = () => {
        singinWithGoogle()
            .then(res => {
                setUser(res.user);
                navigate('/')
            })
            .catch(err => seterror(err.message))
    }


    return (
        <div className="h-screen flex justify-center items-center" style={{
            backgroundImage: "url('/src/assets/bglogin.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
        }}>
            <div className="w-full md:w-4/12 md:mx-auto flex flex-col justify-center items-center bg-white p-6 shadow-lg rounded-lg">
                <div className="w-full max-w-sm">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Log In</h1>
                    <p className="text-gray-600 mb-6 text-center">Please enter your details</p>
                    <form onSubmit={handlelogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input
                                name='email'
                                type="email"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                name='password'
                                type="password"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                placeholder="Enter your password"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 text-purple-600 border-gray-300 rounded"
                                />
                                <span className="ml-2 text-sm text-gray-600">Remember for 30 days</span>
                            </label>
                            <a className="text-sm text-purple-600 hover:text-purple-700" >Forgot password?</a>
                        </div>
                        <p className="text-red-500 text-sm text-left my-2">{error}</p>
                        <button
                            type="submit"
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md"
                        > Log in
                        </button>
                    </form>
                    <div className="mt-6">
                        <button onClick={handleGoogle} className="w-full flex items-center justify-center border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50" ><FcGoogle className="mr-2" /> Sign in with Google </button>
                    </div>
                    <p className="mt-4 text-sm text-center text-gray-600">
                        Don't have an account?
                        <Link to='/register' className="text-purple-600 hover:text-purple-700"> Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;