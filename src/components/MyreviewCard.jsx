import React, { useState } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import useAxios from '../hooks/useAxios';

const MyreviewCard = ({ review, handleUpdated, handleDeleted }) => {
    const { _id, serviceId, text, rating, postedDate, user, servicetitle } = review;
    const axiosSecure = useAxios()

    const [updateModal, setUpdateModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target
        const text = form.text.value
        const rating = parseInt(form.rating.value, 5)
        const updatedData = {text,rating};

        try {
            const response = await axiosSecure.put(`/updatereview/${_id}`, updatedData);
            const updatedReview = { ...review, ...updatedData };
            handleUpdated(updatedReview);
            setUpdateModal(false);
            toast.success('Review Updated Successfully')
        } catch (error) {
            console.error("Error updating review:", error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:6500/deletereview/${_id}?serviceId=${serviceId}`);
            handleDeleted(_id);
            setDeleteModal(false);
            toast.success('Review Deleted')
        } catch (error) {
            console.error("Error deleting review:", error);
        }
    };

    return (
        <div className="flex items-center border px-6 py-4 rounded-lg shadow-md max-w-2xl mx-auto bg-white">
            <img
                src={user.photo}
                alt={user.name}
                className="rounded-full w-24 h-24 mr-4"
            />
            <div>
                <div className="flex flex-col">
                    <span className="font-bold text-lg">{user.name}</span>
                    <span className="text-gray-500 text-sm">{format(postedDate, 'PP')}</span>
                </div>
                <p className='text-lg font-semibold'>{servicetitle}</p>
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
                <div className="flex mt-4">
                    <button onClick={() => setUpdateModal(true)} className="bg-purple-500 py-1 px-4 rounded-md mr-3">
                        Update Review
                    </button>
                    <button onClick={() => setDeleteModal(true)} className="bg-red-500 py-1 px-4 rounded-md">
                        Delete Review
                    </button>
                </div>
            </div>

            {updateModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <h2 className="text-lg font-bold mb-4">Update Review</h2>
                        <form onSubmit={handleSubmit}>
                            <textarea
                                name="text"
                                className="w-full border rounded p-2 mb-4"
                                placeholder="Update your review"
                                required
                            />
                            <input
                                type="number"
                                name="rating"
                                className="w-full border rounded p-2 mb-4"
                                placeholder="Rating"
                                required
                            />
                            <input
                                type="text"
                                name="servicetitle"
                                className="w-full border rounded p-2 mb-4"
                                defaultValue={servicetitle}
                                readOnly
                            />
                            <div className="flex justify-start">
                                <button
                                    type="button"
                                    onClick={() => setUpdateModal(false)}
                                    className="bg-base-200 px-4 py-2 rounded mr-3"
                                > Cancel</button>
                                <button
                                    type="submit"
                                    className="bg-purple-500 text-white px-4 py-2 rounded"
                                > Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {deleteModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-bold mb-4">Delete Review</h2>
                        <p>Are you sure you want to delete this review?</p>
                        <div className="flex justify-start mt-4">
                            <button
                                onClick={() => setDeleteModal(false)}
                                className="bg-base-200 text-black px-4 py-2 rounded mr-3"
                            >Cancel</button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyreviewCard;
