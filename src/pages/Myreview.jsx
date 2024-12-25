import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import MyreviewCard from '../components/MyreviewCard';
import useAxios from '../hooks/useAxios';
import { Helmet } from 'react-helmet';

const Myreview = () => {
    const { user } = useAuth();
    const [reviews, setReviews] = useState([]);
    const axiosSecure = useAxios()

    useEffect(() => {
        axiosSecure.get(`/myreviews/${user?.email}`)
            .then((res) => {
                setReviews(res.data);
            });
    }, [user?.email]);

    const handleUpdated = (updatedReview) => {
        setReviews((previous) =>
            previous.map((review) => (review._id === updatedReview._id ? updatedReview : review))
        );
    };

    const handleDeleted = (deleted) => {
        setReviews((previous) => previous.filter((review) => review._id !== deleted));
    };

    return (
        <div className="grid grid-cols-1 gap-y-2 my-10">
            <Helmet>
                <title>My Review</title>
            </Helmet>
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
