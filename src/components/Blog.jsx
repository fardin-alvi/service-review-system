import React from "react";
import { FaRegCalendarAlt } from "react-icons/fa";

const blogs = [
    {
        id: 1,
        title: "Top 10 Home Services You Should Know",
        image: "https://i.ibb.co.com/D537z7b/b1.jpg", // Replace with Freepik/Icon8 image
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

const Blog = () => {
    return (
        <div className="w-11/12 mx-auto my-10">
            <h2 className="text-3xl font-bold text-start mb-8">Featured Blogs</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <div className="md:col-span-2">
                    <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
                        <img
                            src={blogs[0].image}
                            alt={blogs[0].title}
                            className="w-full h-80 object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-6">
                            <h3 className="text-white text-2xl font-semibold mb-2">
                                {blogs[0].title}
                            </h3>
                            <div className="flex items-center text-sm text-gray-300">
                                <FaRegCalendarAlt className="mr-2" />
                                {blogs[0].date}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Smaller Side Blogs */}
                <div className="grid grid-cols-1 gap-4">
                    {blogs.slice(1).map((blog) => (
                        <div
                            key={blog.id}
                            className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
                        >
                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="w-full h-40 object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4">
                                <h3 className="text-white text-lg font-semibold mb-1">
                                    {blog.title}
                                </h3>
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
    );
};

export default Blog;
