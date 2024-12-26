import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaServicestack } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white px-8 py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <a className="text-xl flex items-center gap-1 "><FaServicestack className='size-7' /><span className='pt-2'><span className='text-teal-700' >Deck</span>Serve</span></a>
                        <p className="mt-2">
                            With DeckServe, discover the best-rated services <br /> in your area or provide feedback <br /> to help businesses improve and thrive.
                        </p>
                    </div>

                    <div className="text-center">
                        <h3 className="text-lg font-semibold">Usefull Links</h3>
                        <div className="flex justify-center mt-4 space-x-4">
                            <Link to='/' >Home</Link>
                            <Link to='/service' >Service</Link>
                            <Link to='/register' >Register</Link>
                            <Link to='/myservice' >My Service</Link>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Find Us in Easy Way</h3>
                        <p className="mt-2">
                            102 Madison Avenue - Second Floor <br />
                            New York, NY 10016 <br />
                            T: (212) 260-1978
                        </p>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-4 text-center text-sm flex flex-col-reverse md:flex-row justify-between items-center gap-y-3 md:gap-y-0">
                    <p>&copy; 2024 Blue Fountain Media. All rights reserved.</p>
                    <div className="flex justify-center mt-4 space-x-4">
                        <a
                            href="#"
                            className="p-2 bg-gray-800 rounded-full hover:bg-gray-700"
                            aria-label="LinkedIn">
                            <FaLinkedinIn />
                        </a>
                        <a
                            href="#"
                            className="p-2 bg-gray-800 rounded-full hover:bg-gray-700"
                            aria-label="Facebook">
                            <FaFacebookF />
                        </a>
                        <a
                            href="#"
                            className="p-2 bg-gray-800 rounded-full hover:bg-gray-700"
                            aria-label="Instagram">
                            <FaInstagram />
                        </a>
                        <a
                            href="#"
                            className="p-2 bg-gray-800 rounded-full hover:bg-gray-700"
                            aria-label="Twitter">
                            <FaTwitter />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;