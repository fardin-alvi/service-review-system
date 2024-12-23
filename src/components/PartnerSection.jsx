import React, { useEffect } from 'react';
import { FaRegSmile } from 'react-icons/fa'; // Replace with your choice of icons
import AOS from 'aos';
import 'aos/dist/aos.css';
import image from '../assets/partner/rb_103.png'

const PartnerSection = () => {
    useEffect(() => {
        AOS.init({ duration: 800 });
    }, []);

    const partners = [
        { name: 'The Best Chef', logo: '../assets/partner/rb_103.png' },
        { name: 'FoodTaster', logo: '../assets/partner/rb_103.png' },
        { name: 'Flavor', logo: '../assets/partner/rb_103.png' },
        { name: 'Culinaire', logo: '../assets/partner/rb_103.png' },
        { name: 'Eater', logo: '../assets/partner/rb_103.png' },
        { name: 'Food & Travel', logo: '../assets/partner/rb_103.png' },
    ];

    return (
        <div className="my-12">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Meet Our Partners</h2>
                <p className='mx-auto text-center text-gray-500 w-auto md:w-4/6'>
                    Meet our trusted partners who share our vision of excellence and innovation. Together, we create unparalleled experiences to serve our community better.
                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6 px-4">
                {partners.map((partner, index) => (
                    <div
                        key={index}
                        data-aos="fade-up"
                        className="flex flex-col items-center"
                    >
                        <img
                            src={image}
                            alt={partner.name}
                            className="w-16 h-16 mb-4"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PartnerSection;
