import React from 'react';
import { FaStar } from 'react-icons/fa';

const ServiceCard = ({ service }) => {
    const {
        title,
        serviceImage,
        category,
        description,
        price,
    } = service;

    return (
        <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
            <div className="p-5">
                <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
                <p className="text-sm text-gray-500">{description.substring(0, 30)}...</p>
                <div className="flex items-center gap-1">
                    <p className="text-gray-700 font-medium">{category}</p>
                    <p className="text-lg text-gray-700 mt-3">
                        From ${price}
                    </p>
                </div>
            </div>
            <img
                className="h-48 w-full object-cover"
                src={serviceImage}
                alt={title}
            />
        </div>
    );
};

export default ServiceCard;
