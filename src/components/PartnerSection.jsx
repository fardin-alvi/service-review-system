import React, { useEffect } from 'react';
import { FaRegSmile } from 'react-icons/fa'; // Replace with your choice of icons
import AOS from 'aos';
import 'aos/dist/aos.css';
import image1 from '../assets/partner/rb_103.png'
import image2 from '../assets/partner/logo2.png'
import image3 from '../assets/partner/logo3.png'
import image4 from '../assets/partner/logo4.png'
import image5 from '../assets/partner/logo5.png'
import image6 from '../assets/partner/logo6.png'

const PartnerSection = () => {
    useEffect(() => {
        AOS.init({ duration: 800 });
    }, []);

    const partners = [
        image1,image2,image3,image4,image5,image6
    ];

    return (
        <div className="my-12">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Meet Our Partners</h2>
                <p className='mx-auto text-center text-gray-500 w-auto md:w-4/6'>
                    Meet our trusted partners who share our vision of excellence and innovation. Together, we create unparalleled experiences to serve our community better.
                </p>
            </div>

            <div className="w-7/12 mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 px-4">
                {partners.map((partner, index) => (
                    <div
                        key={index}
                        data-aos="fade-up"
                        className="flex flex-col items-center"
                    >
                        <img
                            src={partner}
                            alt='logo'
                            className="w-36 h-36 mb-4"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PartnerSection;
