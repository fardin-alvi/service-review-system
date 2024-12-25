import React from 'react';
import { FaStar } from 'react-icons/fa';
import { format } from 'date-fns'

const ReviewCard = ({ review }) => {
    const { text, rating, postedDate, user, } = review
    return (
        <div className="flex items-center border px-6 py-4 rounded-lg shadow-md max-w-2xl mx-auto bg-white">
            <img
                src={ user.photo}
                className="rounded-full w-24 h-24 mr-4"
            />
            <div>
                <div className="flex flex-col">
                    <span className="font-bold text-lg">{user.name}</span>
                    <span className="text-gray-500 text-sm">{format(postedDate, 'PP')}</span>
                </div>
                <div className="flex items-center mt-1">
                    {Array(5)
                        .fill(0)
                        .map((_, index) => (
                            <FaStar
                                key={index}
                                size={18}
                                color={index < rating ? "#FFD700" : "#D3D3D3"}
                                className="mr-1"
                            />
                        ))}
                </div>
                <p className="text-gray-700 text-sm mt-2">{text}</p>
            </div>
        </div>
    );
};

export default ReviewCard;