import React from 'react';

import Header from '../partials/Header';
import HeroHome from '../partials/HeroHome';
import Features from '../partials/Features';
import FeaturesBlocks from '../partials/FeaturesBlocks';
import BenefitsUtilities from '../partials/BenefitsUtilities';
import BenefitsAgent from '../partials/BenefitsAgent';
import BrandMission from '../partials/BrandMission';
import Unique from '../partials/Unique';
import Roadmap from '../partials/Roadmap';
import Members from '../partials/Members';
import FounderBroker from '../partials/FounderBroker';
/* import Testimonials from '../partials/Testimonials';
import Newsletter from '../partials/Newsletter'; */
import Footer from '../partials/Footer';

function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">

        {/*  Page sections */}
        <HeroHome />
        <Features />
        <FeaturesBlocks />
        <BenefitsUtilities/>
        <BenefitsAgent/>
        <BrandMission/>
        <Unique/>
        <Roadmap/>
        <FounderBroker/>
        <Members/>
        {/* <Testimonials />
        <Newsletter /> */}

      </main>

      {/*  Site footer */}
      <Footer />

    </div>
  );
}

export default Home;