import BannerSection from '~/components/Client/BannerSection';
import ServicesSection from '~/components/Client/ServicesSection';
import TestimonialSection from '~/components/Client/TestimonialSection';
import AboutUsSection from '~/components/Client/AboutUsSection';
import { useEffect, useState } from 'react';

function Home() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            <BannerSection />
            <AboutUsSection />
            <ServicesSection />
            <TestimonialSection />
        </>
    );
}

export default Home;
