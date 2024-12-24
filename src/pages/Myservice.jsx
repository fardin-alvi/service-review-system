import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaSearch, FaTrash } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import useAuth from '../hooks/useAuth';
import {format} from 'date-fns'

const Myservice = () => {
    const [services, setServices] = useState([])
    const { user } = useAuth()
    const [searchService, setSearchService] = useState('');
    const [updateService, setUpdateService] = useState(null);
    const [modal, setModal] = useState('')
    useEffect(() => {
        axios.get(`http://localhost:6500/servicesbyemail/${user?.email}`)
            .then(res => {
            setServices(res.data)
        })
    }, [user?.email])

    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const updatedData = {
            image: form.image.value,
            title: form.title.value,
            companyName: form.companyName.value,
            website: form.website.value,
            description: form.description.value,
            category: form.category.value,
            price: form.price.value,
        };
        

        axios.put(`http://localhost:6500/updateservice/${updateService._id}`, updatedData)
            .then((res) => {
                if (res.data.modifiedCount > 0) {
                    toast.success('Service updated successfully!');
                    setServices((prev) =>
                        prev.map((service) =>
                            service._id === updateService._id ? { ...service, ...updatedData } : service
                        )
                    );
                    setUpdateService(null);
                }
            })
            .catch((err) => console.error(err));
    };


    const handleDelete = () => {
        axios.delete(`http://localhost:6500/deleteservice/${updateService._id}`)
            .then((res) => {
                if (res.data.deletedCount > 0) {
                    toast.success('Service deleted successfully!');
                    setServices((prev) => prev.filter((service) => service._id !== updateService._id));
                    setUpdateService(null);
                }
            })
            .catch((err) => console.error(err));
    };


    const filteredServices = services.filter((service) =>
        service.title.toLowerCase().includes(searchService.toLowerCase()) ||
        service.company.toLowerCase().includes(searchService.toLowerCase()) ||
        service.category.toLowerCase().includes(searchService.toLowerCase())
        
        
    );


    
    return (
        <div className="w-11/12 mx-auto my-10">
            <h1 className="text-2xl font-semibold mb-4">My Services</h1>
            <div className="relative w-full mb-3 md:w-1/4">
                <input
                    type="text"
                    placeholder="Search services..."
                    onChange={(e) => setSearchService(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <FaSearch className="absolute top-3 right-3 text-gray-500" size={20} />
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead className="bg-purple-600 text-white">
                        <tr>
                            <th>Title</th>
                            <th>Price</th>
                            <th>category</th>
                            <th>Company</th>
                            <th>Website</th>
                            <th>Posted Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredServices.map((service) => (
                            <tr key={service._id}>
                                <td>{service.title}</td>
                                <td>${service.price}</td>
                                <td>{service.category}</td>
                                <td>{service.company}</td>
                                <td>{service.website}</td>
                                <td>{format(new Date(service.date), 'PP')}</td>
                                <td>
                                    <button
                                        className="btn-sm mr-2"
                                        onClick={() => {
                                            setUpdateService(service);
                                            setModal('update');
                                        }}
                                    >
                                        <FaEdit className='size-5 text-green-600' />
                                    </button>
                                    <button
                                        className="btn-sm"
                                        onClick={() => {
                                            setUpdateService(service);
                                            setModal('delete');
                                        }}
                                    >
                                        <FaTrash className='size-5 text-red-600' />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {modal === 'update' && updateService && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg text-center">Update Service</h3>
                        <form onSubmit={handleUpdate} className="mt-4 space-y-4">
                            <input
                                type="text"
                                name="image"
                                placeholder="Service Image"
                                className="input input-bordered w-full"
                            />
                            <input
                                type="text"
                                name="title"
                                placeholder="Title"
                                className="input input-bordered w-full"
                            />
                            <input
                                type="text"
                                name="companyName"
                                placeholder="Company Name"
                                className="input input-bordered w-full"
                            />
                            <input
                                type="text"
                                name="website"
                                placeholder="Website URL"
                                className="input input-bordered w-full"
                            />
                            <textarea
                                name="description"
                                placeholder="Description"
                                className="textarea textarea-bordered w-full"
                            ></textarea>
                            <input
                                type="text"
                                name="category"
                                placeholder="Category"
                                className="input input-bordered w-full"
                            />
                            <input
                                type="number"
                                name="price"
                                placeholder="Price"
                                className="input input-bordered w-full"
                            />
                            <div className="modal-action">
                                <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-1 px-4 rounded-md">Update</button>
                                <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-1 px-4 rounded-md" onClick={() => setUpdateService(null)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {modal === 'delete' && updateService && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Are you sure you want to delete this service?</h3>
                        <p className="py-4">{updateService.title}</p>
                        <div className="modal-action">
                            <button onClick={handleDelete} className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-1 px-4 rounded-md"> Delete</button>
                            <button onClick={() => setUpdateService(null)} className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-1 px-4 rounded-md">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Myservice;