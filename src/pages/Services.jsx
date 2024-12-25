import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ServiceCard from '../components/ServiceCard';
import { FaSearch } from 'react-icons/fa';
import useAxios from '../hooks/useAxios';

const Services = () => {
    const [services, setServices] = useState([]);
    const [searchService, setSearchService] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [servicesPerPage,setServicePerPage] = useState(6)
    const axiosSecure = useAxios()

    useEffect(() => {
        axiosSecure.get('/services')
            .then(res => {
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

    // Filtered services based on search and category
    const filteredServices = services.filter(service => {
        const matchSearch = service.title.toLowerCase().includes(searchService.toLowerCase()) ||
            service.company.toLowerCase().includes(searchService.toLowerCase()) ||
            service.category.toLowerCase().includes(searchService.toLowerCase());
        const matchesCategory = selectedCategory ? service.category === selectedCategory : true;

        return matchSearch && matchesCategory;
    });

    // Pagination logic
    const indexOfLastService = currentPage * servicesPerPage;
    const indexOfFirstService = indexOfLastService - servicesPerPage;
    const currentServices = filteredServices.slice(indexOfFirstService, indexOfLastService);

    const totalPages = Math.ceil(filteredServices.length / servicesPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_,index) => index + 1);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

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
                {currentServices.map(service => (<ServiceCard key={service._id} service={service} />))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-5">
                {pageNumbers.map(pageNumber => (
                    <button
                        key={pageNumber}
                        className={`mx-1 px-3 py-1 border rounded-lg ${currentPage === pageNumber ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => handlePageChange(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Services;
