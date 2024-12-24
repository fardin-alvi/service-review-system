import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CountUp from 'react-countup';
import { FaUsers, FaStar, FaServicestack } from 'react-icons/fa';

const Statis = () => {
    const [counts, setCounts] = useState({ usersCount: 0, reviewsCount: 0, servicesCount: 0 });

    useEffect(() => {
        axios.get('http://localhost:6500/counts')
            .then(res => setCounts(res.data))
            .catch(error => console.error('Error fetching counts:', error));
    }, []);

    console.log(counts);

    const stats = [
        { icon: <FaUsers size={40} className="text-purple-500" />, label: "Users", value: counts.users },
        { icon: <FaStar size={40} className="text-yellow-500" />, label: "Reviews", value: counts.reviews },
        { icon: <FaServicestack size={40} className="text-blue-500" />, label: "Services", value: counts.service },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-11/12 mx-auto my-10">
            {stats.map((stat, index) => (
                <div
                    key={index}
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
    );
};

export default Statis;
