import React from 'react';
import Banner from '../components/Banner';
import Featues from '../components/Featues';
import PartnerSection from '../components/PartnerSection';
import HighReview from '../components/HighReview';
const Home = () => {
    return (
        <div>
            <Banner />
            <Featues />
            <PartnerSection />
            <HighReview/>
        </div>
    );
};

export default Home;