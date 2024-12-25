import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { toast} from 'react-hot-toast';
import axios from 'axios';
import useAxios from '../hooks/useAxios';
import { Helmet } from 'react-helmet';


const Register = () => {
    const [error, seterror] = useState('')
    const navigate = useNavigate()
    const axiosSecure = useAxios()

    const { CreateUser, setUser, updateprofile, singinWithGoogle } = useAuth()

    const handleregister = (e) => {
        e.preventDefault()
        const form = new FormData(e.target)
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const photoUrl = form.get('photoUrl')
        const passwordValidate = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!passwordValidate.test(password)) {
            seterror('Password must be at least 6 characters long, contain an uppercase and lowercase')
            return
        }

        CreateUser(email, password)
            .then(res => {
                console.log(res.user);
                setUser(res.user);
                navigate('/')
                const newuser = {
                    name: res.user.displayName,
                    email: res.user.email,
                    photoUrl: res.user.photoURL
                }
                axiosSecure.post('/users', newuser)
                    .then(res => {
                        toast.success('Successfully Registered');
                    })
                    .catch(error => {
                        toast.error('Error Occured:', error);
                    });
                updateprofile({ displayName: name, photoURL: photoUrl })
                    .then(() => navigate('/'))
                setUser((previoususer) => ({ ...previoususer, displayName: name, photoURL: photoUrl }))
            })
            .catch(error => {
                seterror(error.message);
            })
    }
    const handleGoogle = () => {
        singinWithGoogle()
            .then(res => {
                setUser(res.user);
                navigate('/')
                const newuser = {
                    name:res.user.displayName,
                    email: res.user.email,
                    photoUrl:res.user.photoURL
                }
                axiosSecure.post('/users', newuser)
                    .then(res => {
                        console.log('User added to the database:', res.data);
                        toast.success('Successfully Registered');
                    })
                    .catch(error => {
                        toast.error('Error Occured:', error);
                    });
            })
            .catch(err => seterror(err.message))
    }
    return (
        <div className="h-[700px] flex justify-center items-center" style={{
            backgroundImage: "url('/src/assets/bglogin.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
        }}>
            <Helmet>
                <title>Register</title>
            </Helmet>
            <div className="w-full md:w-4/12 md:mx-auto flex flex-col justify-center items-center bg-white p-6 shadow-lg rounded-lg">
                <div className="w-full max-w-sm">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Register</h1>
                    <p className="text-gray-600 mb-6 text-center">Please enter your details</p>
                    <form onSubmit={handleregister} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                name='name'
                                type="text"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                placeholder="Enter your Name"
                            />
                        </div>
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
                            <label className="block text-sm font-medium text-gray-700">Photo Url</label>
                            <input
                                name='photoUrl'
                                type="url"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                placeholder="Enter your PhotoUrl"
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
                        {
                            error && (<p className='text-red-600 text-sm'>{error}</p>)
                        }
                        <button
                            type="submit"
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md"
                        >Register</button>
                    </form>
                    <div className="mt-6">
                        <button onClick={handleGoogle} className="w-full flex items-center justify-center border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50" ><FcGoogle className="mr-2 text-orange-400" /> Sign in with Google </button>
                    </div>
                    <p className="mt-4 text-sm text-center text-gray-600">
                        Don't have an account?
                        <Link to='/login' className="text-purple-600 hover:text-purple-700"> Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;