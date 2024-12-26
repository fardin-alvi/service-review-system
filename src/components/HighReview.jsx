import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { BiCategory } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import useAxios from '../hooks/useAxios';

const HighReview = () => {
    const [services, setServices] = useState([])
    const axiosSecure = useAxios()
    useEffect(() => {
        axiosSecure.get('/services')
            .then(res => {
            setServices(res.data)
        })
    }, [])
    
    
    const filterhighServices = services.filter(service => service.reviewCount > 0).sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 6);

    return (
        <section className="w-full px-2 sm:w-11/12 sm:mx-auto my-10">
            <div className='my-10'>
                <p className="text-3xl font-bold text-center mb-2">Top Reviewed Services</p>
                <p className="text-center mb-4 mt-3">
                    Discover our most-reviewed service, trusted by countless customers for its reliability and excellence. <br /> Join the many satisfied clients who have experienced the quality that sets us apart.
                </p>
            </div>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={10}
                slidesPerView={1}
                navigation
                autoplay={{ delay: 3000 }}
                pagination={{ clickable: true }}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 }
                }}
            >
                {filterhighServices.map(service => (
                    <SwiperSlide key={service._id}>
                        <div className="max-w-sm h-[350px] mx-auto bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                            <div className="px-5 py-3">
                                <h2 className="text-xl font-bold text-gray-800">{service.title}</h2>
                                <p className="text-base text-gray-500">{service.description.substring(0, 30)}...</p>
                                <div className='flex justify-start'>
                                    <div className='space-x-3 flex items-center justify-start'>
                                        <div className='flex items-center space-x-1'>
                                            <BiCategory className="text-gray-500" />
                                            <span className="text-gray-700 font-medium">{service.category}</span>
                                        </div>
                                        <span className='text-gray-500 size-2 flex justify-center items-center'>|</span>
                                        <h3 className="font-medium text-gray-700">From ${service.price}</h3>
                                    </div>
                                </div>
                                <div className='mt-2'>
                                    <Link to={`/servicedetails/${service._id}`} className='bg-purple-600 hover:bg-purple-700 text-white font-semibold py-1 px-4 rounded-md'>See Details</Link>
                                </div>
                            </div>
                            <img
                                className="h-64 w-full object-cover"
                                src={service.serviceImage}
                                alt={service.title}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default HighReview;