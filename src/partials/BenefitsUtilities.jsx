import React, { useState, useRef, useEffect } from 'react';
import Transition from '../utils/Transition';

import FeaturesBg from '../images/features-bg.png';
import FeaturesElement from '../images/features-element.png';

import I4 from '../images/i1.png';
import I3 from '../images/i2.png';
import I2 from '../images/i3.png';
import I1 from '../images/i4.png';
import large  from '../images/benefitsNFT.png';
import medium  from '../images/benefitsNFT2.png';
import small  from '../images/benefitsNFT3.png';

import '../css/roadmap.css';

function BenefitsUtilities() {

  const [tab, setTab] = useState(1);

  const tabs = useRef(null);



  return (
    <section className="relative" /*style={{ backgroundImage: `url(${Background})`, backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover',height: '100%'}}*/>

      {/* Section background (needs .relative class on parent and next sibling elements) */}
      <div className="absolute inset-0 bg-white-100 pointer-events-none mb-16" aria-hidden="true"></div>
{/*       <div className="absolute left-0 right-0 m-auto w-px p-px h-20 bg-gray-200 transform -translate-y-1/2"></div>
 */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-12 md:pt-20">

          {/* Section header */}
          <div className="max-w-5xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="h6 mb-4" style={{fontSize:'50px'}}>General Benefits & Utilities of the NFT</h1>
            <p className="text-xl text-gray-600">NFT technology helps us with regular company processes.</p>
          </div>

          <div id="def_small">
            <img src={small}  />
          </div>
          <div id="def_medium">
            <img src={medium}  />
          </div>
          <div id="def_large">
            <img src={large}  />
          </div>
          {/* className="md:max-w-none mx-auto rounded"  */}
        </div >
      </div >
    </section >
  );
}

export default BenefitsUtilities;
