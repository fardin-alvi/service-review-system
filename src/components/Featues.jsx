import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';

const Featues = () => {
    const [services, setServices] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:6500/service')
            .then(response => {
                setServices(response.data);
            })
            .catch(error => {
                console.error("Error fetching services:", error);
            });
    }, []);
    return (
        <div className='w-11/12 mx-auto my-10'>
            <div>
                <h2 className='text-2xl font-bold text-center'>Features of Our Services</h2>
                <p className='mx-auto text-center text-gray-500 w-auto md:w-4/6'>
                    Our services are crafted with precision to meet your unique needs, ensuring exceptional quality and satisfaction. With expert professionals and cutting-edge solutions, we deliver results that exceed expectations.
                </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-3 mt-10'>
                {
                    services.map(service => <ServiceCard key={service._id} service={service} ></ServiceCard>)
                }
            </div>  
        </div>
    );
};

export default Featues;