import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import banner1 from '../assets/banner1.jpg'
import banner2 from '../assets/banner2.jpg'
import banner3 from '../assets/banner3.jpg'
import banner4 from '../assets/banner4.jpg'

const Banner = () => {
    return (
        <div className='my-7 z-10 w-11/12 mx-auto'>
            <Swiper
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className="relative h-[480px] w-full rounded-xl overflow-hidden">
                        <img
                            className="h-full w-full object-cover"
                            src={banner1}
                            alt=""
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <h2 className="text-white text-2xl font-bold text-center max-w-[600px]">Discover authentic feedback, trust the experiences of others,and make confident choices every time!</h2>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative h-[480px] w-full rounded-xl overflow-hidden">
                        <img
                            className="h-full w-full object-cover"
                            src={banner2}
                            alt=""
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <h2 className="text-white text-2xl font-bold text-center max-w-[600px]">Share your story, help others, and transform services with your honest reviews!</h2>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative h-[480px] w-full rounded-xl overflow-hidden">
                        <img
                            className="h-full w-full object-cover"
                            src={banner3}
                            alt=""
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <h2 className="text-white text-2xl font-bold text-center max-w-[600px]">Connect with a community that values your opinion and builds better services for all!</h2>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative h-[480px] w-full rounded-xl overflow-hidden">
                        <img
                            className="h-full w-full object-cover"
                            src={banner4}
                            alt=""
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <h2 className="text-white text-2xl font-bold text-center max-w-[600px]">Join thousands in creating a trustworthy space for sharing and discovering service excellence!</h2>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;