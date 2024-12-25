import React from 'react';
import Banner from '../components/Banner';
import Featues from '../components/Featues';
import PartnerSection from '../components/PartnerSection';
import HighReview from '../components/HighReview';
import Statis from '../components/Statis';
import Blog from '../components/Blog';
import Viewer from '../components/Viewer';

const Home = () => {
    return (
        <div>
            <Banner />
            <Featues />
            <PartnerSection />
            <HighReview />
            <Statis />
            <Blog/>
            {/* <Viewer/> */}
        </div>
    );
};

export default Home;