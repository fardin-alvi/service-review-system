import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ServiceCard from '../components/ServiceCard';
import { FaSearch } from 'react-icons/fa';

const Services = () => {
    const [services, setServices] = useState([]);
    const [searchService, setSearchService] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:6500/services')
            .then(res => {
                console.log(res.data);
                setServices(res.data);

                const categoryfilter = Array.from(new Set(res.data.map(service => service.category)));
                setCategories(categoryfilter);
            })
            .catch(error => console.error('Error fetching services:', error));
    }, []);

    const handleSearch = (e) => {
        setSearchService(e.target.value);
    };

    const handleCategory = (e) => {
        setSelectedCategory(e.target.value);
    };

    const filteredServices = services.filter(service => {
        const matchSearch = service.title.toLowerCase().includes(searchService.toLowerCase()) ||
            service.company.toLowerCase().includes(searchService.toLowerCase()) ||
            service.category.toLowerCase().includes(searchService.toLowerCase());
        const matchesCategory = selectedCategory ? service.category === selectedCategory : true;

        return matchSearch && matchesCategory;
    });

    return (
        <div className="w-11/12 mx-auto my-10">
            <p className='text-xl font-semibold mb-5'>All Services</p>
            <div className="flex items-center justify-between mb-6">
                <div className="relative w-40 md:w-1/4">
                    <input
                        type="text"
                        placeholder="Search services..."
                        onChange={handleSearch}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <FaSearch className="absolute top-3 right-3 text-gray-500" size={20} />
                </div>

                <div>
                    <select
                        onChange={handleCategory}
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="">All Categories</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {
                    filteredServices.map(service => (<ServiceCard key={service._id} service={service} />))
                }
            </div>
        </div>
    );
};

export default Services;
