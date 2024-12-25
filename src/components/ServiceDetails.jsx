import React, { useState, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { FaBuildingColumns } from "react-icons/fa6";
import { AiFillDribbbleCircle } from 'react-icons/ai';
import { IoMdPricetags } from 'react-icons/io';
import { SlCalender } from 'react-icons/sl';
import { FaStar } from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';
import useAuth from '../hooks/useAuth';
import { FcRating } from 'react-icons/fc';
import toast from 'react-hot-toast';
import axios from 'axios';
import ReviewCard from './ReviewCard';
import {format} from 'date-fns'

const ServiceDetails = () => {
    const { user } = useAuth();
    const service = useLoaderData();
    const { title, serviceImage, company, website, description, price, date, _id,reviewCount } = service;
    const [rating, setRating] = useState(0);
    const [reviews, setReviews] = useState([])
    const [reviewcount, setReviewcount] = useState(reviewCount);

    const handleAddReview = async (e) => {
        e.preventDefault();
        const form = e.target;
        const review = form.review.value;
        const date = form.date.value;

        const reviewsData = {
            serviceId: _id,
            text: review,
            rating: rating,
            postedDate: new Date(date),
            servicetitle : title,
            user: { name: user.displayName, userEmail: user.email, photo: user.photoURL },
        };

        try {
            const response = await axios.post('http://localhost:6500/addreview', reviewsData);
            if (response.data.insertedId) {
                toast.success('Review added successfully!');
                form.reset();
                setRating(0); 
                fetchReviews();
                setReviewcount(prevCount => prevCount + 1);
            } else {
                toast.error('Failed to add review.');
            }
        } catch (error) {
            toast.error('An error occurred.');
        }
    };

    const fetchReviews = () => {
        axios.get(`http://localhost:6500/reviews/${_id}`)
            .then(res => setReviews(res.data))
            .catch(err => console.error('Error fetching reviews:', err));
    };
    useEffect(() => {
        fetchReviews();
    }, [_id]);

    const renderStars = () => {
        return Array(5).fill(0).map((_, index) => (
                <FaStar
                    key={index}
                    size={24}
                    onClick={() => setRating(index + 1)} 
                    color={(index + 1) <= rating ? '#FFD700' : '#D3D3D3'}
                    style={{ cursor: 'pointer', marginRight: '4px' }}
                />
            ));
    };



    return (
        <div className='grid md:grid-cols-12 grid-cols-1 w-11/12 mx-auto items-start my-10'>

            <div className=" flex flex-col items-start px-4 py-2 md:col-span-8 ">
                <div className="max-w-4xl  flex flex-col md:flex-row items-center border-2 rounded-lg overflow-hidden">
                    <div className="relative w-full md:w-1/2 p-6">
                        <img src={serviceImage} alt={title} className="w-full rounded-lg" />
                    </div>
                    <div className="w-full md:w-1/2 p-6">
                        <h1 className="text-3xl font-bold mb-4">{title}</h1>
                        <p className="text-gray-500 mb-6">{description}</p>
                        <p className="flex gap-x-2 items-center mb-3"><FaBuildingColumns /><span>{company}</span></p>
                        <p className="flex gap-x-2 items-center mb-3"><AiFillDribbbleCircle /><span>{website}</span></p>
                        <div className="flex items-center gap-x-10">
                            <p className="flex gap-x-2 items-center mb-3"><IoMdPricetags /><span>{price}</span></p>
                            <p className="flex gap-x-2 items-center mb-3"><SlCalender /><span>{format(date, 'PP')}</span></p>
                        </div>
                    </div>
                </div>
                <p className='text-2xl font-semibold text-left mt-3'>Reviews: <span className='bg-purple-200 text-base px-3 rounded-md'>{reviewcount}</span></p>
                <div className='grid grid-cols-1 gap-y-2 my-3 items-start'>
                    {
                        reviews?.map(review=><ReviewCard key={review._id} review={review}></ReviewCard>)
                    }
                </div>
            </div>

            <div className='md:col-span-4 flex items-center my-2'>
                <div className="border-2 rounded-lg p-5 w-full mx-w-lg ">
                    <p className="text-gray-600 mb-2 font-bold text-xl">Add Review</p>
                    <form onSubmit={handleAddReview} className='space-y-2'>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700">Review</label>
                            <textarea name="review" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" placeholder="Descriptiom"
                            ></textarea>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <label className="block text-sm font-semibold text-gray-700 ">Rating</label>
                            <div className="flex">{renderStars()}</div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700">Review Date</label>
                            <input
                                name="date"
                                type="date"
                                defaultValue={new Date().toISOString().split('T')[0]} 
                                readOnly
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 bg-gray-200 cursor-not-allowed"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md"
                        > Add Review
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetails;
