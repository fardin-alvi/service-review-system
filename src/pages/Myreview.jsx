import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import MyreviewCard from '../components/MyreviewCard';


const Myreview = () => {
    const { user } = useAuth()
    const [reviews,setReviews] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:6500/myreviews/${user?.email}`)
            .then(res => {
            setReviews(res.data);
        })
    },[])
    return (
        <div>
            <div className='grid grid-cols-1 gap-y-2 my-10'>
                {
                    reviews.map(review=><MyreviewCard review={review} />)
                }
            </div>
        </div>
    );
};

export default Myreview;