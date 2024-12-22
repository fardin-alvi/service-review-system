import React from 'react';
import { BiCategory } from "react-icons/bi";
import { Link } from 'react-router-dom';

const ServiceCard = ({ service }) => {
    const {
        title,
        serviceImage,
        category,
        description,
        price,
        _id
    } = service;

    return (
        <div className="max-w-sm h-[350px] mx-auto bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
            <div className="px-5 py-3">
                <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                <p className="text-base text-gray-500">{description.substring(0, 30)}...</p>
                <div className='flex justify-between'>
                    <div className='space-x-3 flex items-center justify-start'>
                        <div className='flex items-center space-x-1'>
                            <BiCategory className="text-gray-500" />
                            <span className="text-gray-700 font-medium">{category}</span>
                        </div>
                        <span className='text-gray-500 size-2 flex justify-center items-center'>|</span>
                        <h3 className="font-medium text-gray-700">From ${price}</h3>
                    </div>
                    <Link to={`/servicedetails/${_id}`} className='bg-purple-600 hover:bg-purple-700 text-white font-semibold py-1 px-4 rounded-md'>See Details</Link>
                </div>
            </div>
            <img
                className="h-64 w-full object-cover"
                src={serviceImage}
                alt={title}
            />
        </div>
    );
};

export default ServiceCard;
