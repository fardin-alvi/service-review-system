import React from 'react';
import Banner from '../components/Banner';
import Featues from '../components/Featues';
import PartnerSection from '../components/PartnerSection';
import HighReview from '../components/HighReview';
import Statis from '../components/Statis';
import Blog from '../components/Blog';
import Viewer from '../components/Viewer';
import { Helmet } from 'react-helmet';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home</title>
            </Helmet>
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