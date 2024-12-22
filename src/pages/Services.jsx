import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ServiceCard from '../components/ServiceCard';

const Services = () => {
    const [services,setServices] = useState([])
    useEffect(() => {
        axios.get('http://localhost:6500/services')
        .then(res=>setServices(res.data))
    }, [])

    return (
        <div className='grid grid-cols-1 md:grid-cols-3 my-10 w-11/12 mx-auto'>
            {
                services.map(service=><ServiceCard key={service._id} service={service} ></ServiceCard>)
            }
        </div>
    );
};

export default Services;