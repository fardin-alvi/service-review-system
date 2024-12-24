import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import MyreviewCard from '../components/MyreviewCard';
import useAxios from '../hooks/useAxios';

const Myreview = () => {
    const { user } = useAuth();
    const [reviews, setReviews] = useState([]);
    const axiosSecure = useAxios()

    useEffect(() => {
        axiosSecure.get(`http://localhost:6500/myreviews/${user?.email}`).then((res) => {
            setReviews(res.data);
        });
    }, [user?.email]);

    const handleUpdated = (update) => {
        setReviews((previous) =>
            previous.map((review) => (review._id === update._id ? update : review))
        );
    };

    const handleDeleted = (deleted) => {
        setReviews((previous) => previous.filter((review) => review._id !== deleted));
    };

    return (
        <div className="grid grid-cols-1 gap-y-2 my-10">
            {reviews.map((review) => (
                <MyreviewCard
                    key={review._id}
                    review={review}
                    handleUpdated={handleUpdated}
                    handleDeleted={handleDeleted}
                />
            ))}
        </div>
    );
};

export default Myreview;
