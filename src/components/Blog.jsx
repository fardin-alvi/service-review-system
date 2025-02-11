import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegCalendarAlt, FaChevronDown, FaChevronUp } from "react-icons/fa";

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:6500/blogs')
            .then(res => {
                setBlogs(res.data);
            })
            .catch(error => {
                toast.error("There was an error fetching the blogs:", error);
            });
    }, []);

    const handleSeeAll = () => {
        setShowAll(!showAll);
    };

    return (
        <div className="w-11/12 mx-auto my-10">
            <h2 className="text-3xl font-bold text-center mb-2">Elevating Your Experience</h2>
            <p className='mx-auto text-center text-gray-500 w-auto md:w-4/6 mb-8'>
                Learn how our services are shaping a brighter tomorrow for learners of all ages.Unveiling the best services to help you lead a healthier and happier life.Explore cutting-edge services crafted for seamless integration and efficiency.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                    <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
                        <img
                            src={blogs[0]?.image}
                            alt={blogs[0]?.title}
                            className="w-full h-80 object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-6">
                            <h3 className="text-white text-2xl font-semibold mb-2">
                                {blogs[0]?.title}
                            </h3>
                            <div className="flex items-center text-sm text-gray-300">
                                <FaRegCalendarAlt className="mr-2" />
                                {blogs[0]?.date}
                            </div>
                        </div>
                    </div>

                    {blogs.length > 2 && (
                        <button
                            className="mt-4 flex items-center text-purple-500"
                            onClick={handleSeeAll}
                        >
                            {showAll ? (
                                <>
                                    <FaChevronUp className="mr-2" />
                                    Show Less
                                </>
                            ) : (
                                <>
                                    <FaChevronDown className="mr-2" />
                                    Show More
                                </>
                            )}
                        </button>
                    )}
                </div>
                <div className="grid grid-cols-1 gap-4">
                    {blogs.slice(1, showAll ? blogs.length : 3)?.map((blog) => (
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
