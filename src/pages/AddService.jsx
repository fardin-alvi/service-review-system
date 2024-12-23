import React, { useState } from 'react';
import addserviceimage from '../assets/addservicepage.png'
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import {toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddService = () => {
    const { user } = useAuth()
    const [services, setServices] = useState([])
    const navigate = useNavigate()

    const handleservice = (e) => {
        e.preventDefault()
        const form = e.target 
        const title = form.title.value
        const serviceImage = form.serviceImage.value
        const company = form.company.value
        const website = form.website.value
        const category = form.category.value
        const description = form.description.value
        const price = form.price.value
        const date = form.date.value
        const userEmail = user.email

        const services = { title, serviceImage, company, website, category, description, price, date, userEmail, reviewCount }

        axios.post('http://localhost:6500/addservice', services)
            .then(res => {
                setServices(res.data);
                form.reset()
                toast.success('Services is Added')
                navigate('/')

        })

    }
    return (
        <div className="flex h-screen justify-between">
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white px-3 ">
                <div className="w-full max-w-sm">
                    <h1 className="text-2xl text-center font-bold text-gray-900 mb-2">Add Your Sevice</h1>
                    <form onSubmit={handleservice} className="space-y-2">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700">Service Title</label>
                            <input
                                name='title'
                                type="text"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                placeholder="Title"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700">Service Image</label>
                            <input
                                name='serviceImage'
                                type="url"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                placeholder="Image"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700">Company Name</label>
                            <input
                                name='company'
                                type="text"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                placeholder="Company Name"
                            />
                        </div>
                        <div className='flex gap-x-2'>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700">Website</label>
                                <input
                                    name='website'
                                    type="url"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                    placeholder="Website"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700">Category</label>
                                <input
                                    name='category'
                                    type="text"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                    placeholder="Category"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700">Descreption</label>
                            <textarea name="description" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" placeholder="Descriptiom"
                            ></textarea>
                        </div>
                        <div className='flex justify-between'>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700">Price</label>
                                <input
                                    name='price'
                                    type="number"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                    placeholder="Price"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700">Date</label>
                                <input
                                    name='date'
                                    type="date"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md"
                        > Add Service
                        </button>
                    </form>
                </div>
            </div>
            <div className='h-screen'>
                <img className='h-full' src={addserviceimage} alt="" />
            </div>
        </div>
    );
};

export default AddService;