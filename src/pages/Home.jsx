import React from 'react';
import Banner from '../components/Banner';
import Featues from '../components/Featues';
import PartnerSection from '../components/PartnerSection';
import HighReview from '../components/HighReview';
import Statis from '../components/Statis';
import Blog from '../components/Blog';
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
        </div>
    );
};

export default Home;