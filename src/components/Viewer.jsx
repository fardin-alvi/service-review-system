import React, { useEffect, useState } from "react";
import axios from "axios";
import CountUp from "react-countup";
import { FaUsers, FaStar, FaServicestack, FaRegCalendarAlt } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import useAxios from "../hooks/useAxios";

const blogs = [
    {
        id: 1,
        title: "Top 10 Home Services You Should Know",
        image: "https://i.ibb.co.com/D537z7b/b1.jpg",
        date: "December 24, 2024",
        description: "Discover the best home services to save time and improve your daily life.",
    },
    {
        id: 2,
        title: "How to Choose the Right Electrician",
        image: "https://i.ibb.co.com/QJVBd66/b2.jpg",
        date: "December 20, 2024",
        description: "Tips and tricks for finding a reliable electrician for your needs.",
    },
    {
        id: 3,
        title: "5 Ways to Optimize Your Cleaning Service Experience",
        image: "https://i.ibb.co.com/HVcdRVV/b4.jpg",
        date: "December 18, 2024",
        description: "Learn how to get the most out of your cleaning service.",
    },
    {
        id: 4,
        title: "The Importance of Regular Plumbing Maintenance",
        image: "https://i.ibb.co.com/tsZ3BBW/b3.jpg",
        date: "December 15, 2024",
        description: "Prevent costly repairs by maintaining your plumbing system.",
    },
];

const Viwer = () => {
    const [counts, setCounts] = useState({ users: 0, reviews: 0, service: 0 });
    const axiosSecure = useAxios();

    useEffect(() => {
        // Initialize AOS animations
        AOS.init({ duration: 1000 });

        // Fetch counts
        axiosSecure.get("/counts")
            .then((res) => setCounts(res.data))
            .catch((error) => console.error("Error fetching counts:", error));
    }, []);

    const stats = [
        { icon: <FaUsers size={40} className="text-purple-500" />, label: "Users", value: counts.users },
        { icon: <FaStar size={40} className="text-yellow-500" />, label: "Reviews", value: counts.reviews },
        { icon: <FaServicestack size={40} className="text-blue-500" />, label: "Services", value: counts.service },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-11/12 mx-auto my-10">
            {/* Blog Section */}
            <div className="col-span-2">
                <h2 className="text-3xl font-bold mb-6">Featured Blogs</h2>
                <div className="grid grid-cols-1 gap-6">
                    {/* Main Blog */}
                    <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
                        <img
                            src={blogs[0].image}
                            alt={blogs[0].title}
                            className="w-full h-96 object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-6">
                            <h3 className="text-white text-3xl font-semibold mb-2">{blogs[0].title}</h3>
                            <p className="text-white mb-4">{blogs[0].description}</p>
                            <div className="flex items-center text-sm text-gray-300">
                                <FaRegCalendarAlt className="mr-2" />
                                {blogs[0].date}
                            </div>
                        </div>
                    </div>
                    {/* Smaller Blogs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {blogs.slice(1).map((blog) => (
                            <div
                                key={blog.id}
                                className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
                            >
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4">
                                    <h3 className="text-white text-lg font-semibold mb-1">{blog.title}</h3>
                                    <div className="flex items-center text-sm text-gray-300">
                                        <FaRegCalendarAlt className="mr-2" />
                                        {blog.date}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Statistics Section */}
            <div>
                <h2 className="text-3xl font-bold mb-6 text-center md:text-left">Statistics</h2>
                <div className="grid grid-cols-1 gap-6">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            data-aos="fade-left"
                            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center hover:shadow-2xl transition-shadow duration-300"
                        >
                            <div className="mb-4">{stat.icon}</div>
                            <h3 className="text-3xl font-semibold text-gray-800">
                                <CountUp end={stat.value} duration={2.5} separator="," />
                            </h3>
                            <p className="text-gray-500 mt-2">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Viwer;
