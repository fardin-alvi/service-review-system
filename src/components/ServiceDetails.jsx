import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { MdSchedule } from 'react-icons/md';
import { FaBuildingColumns } from "react-icons/fa6";
import { AiFillDribbbleCircle } from 'react-icons/ai';
import { IoMdPricetags } from 'react-icons/io';
import { SlCalender } from 'react-icons/sl';
import { FaStar } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useAuth from '../hooks/useAuth';
import { FcRating } from 'react-icons/fc';

const ServiceDetails = () => {
    const { user } = useAuth();
    const service = useLoaderData();
    const { title, serviceImage, company, website, description, price, date, _id } = service;
    const [reviews, setReviews] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);
    const [reviewDate, setReviewDate] = useState(new Date());
    const [totalRating, setTotalRating] = useState(0);

    // Fetch reviews when the component loads
    const fetchReviews = async () => {
        const response = await fetch(`http://localhost:6500/reviews/${_id}`);
        const data = await response.json();
        setReviews(data);
        const total = data.reduce((acc, review) => acc + review.rating, 0);
        setTotalRating(total / data.length || 0); // Average rating
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    // Handle adding a review
    const handleAddReview = async () => {
        const review = {
            serviceId: _id,
            text: reviewText,
            rating,
            postedDate: reviewDate.toISOString(),
            user: { name: user.email, photo: user.photoURL },
        };

        const response = await fetch('http://localhost:6500/addreview', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(review),
        });

        if (response.ok) {
            setIsModalOpen(false);
            fetchReviews(); // Refresh reviews
        }
    };

    // Render star icons for rating
    const renderStars = (currentRating) => {
        return Array(5)
            .fill(0)
            .map((_, index) => (
                <FaStar
                    key={index}
                    size={24}
                    onClick={() => setRating(index + 1)}
                    color={(index + 1) <= currentRating ? '#FFD700' : '#D3D3D3'}
                    style={{ cursor: 'pointer', marginRight: '4px' }}
                />
            ));
    };

    return (
        <div className=" flex items-center justify-center p-4 text-white">
            <div className="max-w-6xl  flex flex-col md:flex-row items-center bg-[#082C38] rounded-lg shadow-lg overflow-hidden">
                {/* Left Section */}
                <div className="relative w-full md:w-1/2 p-6">
                    <img src={serviceImage} alt={title} className="w-full rounded-lg" />
                    <button className="absolute bottom-4 left-4 bg-yellow-500 text-black font-medium px-4 py-2 rounded-full flex items-center shadow-md">
                        <FcRating className="mr-2" />
                        Rating: {totalRating}
                    </button>
                </div>
                {/* Right Section */}
                <div className="w-full md:w-1/2 p-6">
                    <h1 className="text-3xl font-bold mb-4">{title}</h1>
                    <p className="text-gray-500 mb-6">{description}</p>
                    <p className="flex gap-x-2 items-center mb-3"><FaBuildingColumns /><span>{company}</span></p>
                    <p className="flex gap-x-2 items-center mb-3"><AiFillDribbbleCircle /><span>{website}</span></p>
                    <div className="flex items-center gap-x-10">
                        <p className="flex gap-x-2 items-center mb-3"><IoMdPricetags /><span>{price}</span></p>
                        <p className="flex gap-x-2 items-center mb-3"><SlCalender /><span>{date}</span></p>
                    </div>
                    <button
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full font-medium transition"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Add Review
                    </button>
                </div>
            </div>

            {/* Review Section */}
            {/* <div className="mt-10">
                <h2 className="text-2xl font-bold mb-4">Reviews ({reviews.length})</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviews.map((review) => (
                        <div key={review._id} className="bg-gray-800 p-4 rounded-lg shadow-md">
                            <div className="flex items-center mb-4">
                                <img
                                    src={review.user.photo}
                                    alt={review.user.name}
                                    className="w-12 h-12 rounded-full mr-4"
                                />
                                <div>
                                    <h3 className="text-lg font-bold">{review.user.name}</h3>
                                    <p className="text-gray-400">{new Date(review.postedDate).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <p className="mb-2">{review.text}</p>
                            <p>Rating: {review.rating}/5</p>
                        </div>
                    ))}
                </div>
            </div> */}

            {/* Review Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white text-black p-6 rounded-lg w-[300px] shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Add Review</h2>
                        <textarea
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            placeholder="Write your review..."
                            className="w-full p-2 border rounded-lg mb-4"
                        />
                        <div className="flex mb-4">{renderStars(rating)}</div>
                        <p className="mb-2">Review Date:</p>
                        <DatePicker
                            selected={reviewDate}
                            onChange={(date) => setReviewDate(date)}
                            className="p-2 border rounded-lg"
                        />
                        <div className="flex justify-start mt-4">
                            <button
                                className="bg-green-600 text-white px-4 py-2 rounded-lg mr-2"
                                onClick={handleAddReview}
                            > Add Review </button>
                            <button
                                className="bg-red-600 text-white px-4 py-2 rounded-lg"
                                onClick={() => setIsModalOpen(false)}
                            > Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ServiceDetails;
