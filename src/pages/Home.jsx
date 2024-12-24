import React from 'react';
import Banner from '../components/Banner';
import Featues from '../components/Featues';
import PartnerSection from '../components/PartnerSection';
import HighReview from '../components/HighReview';
import Statis from '../components/Statis';

const Home = () => {
    return (
        <div>
            <Banner />
            <Featues />
            <PartnerSection />
            <HighReview />
            <Statis/>
        </div>
    );
};

export default Home;