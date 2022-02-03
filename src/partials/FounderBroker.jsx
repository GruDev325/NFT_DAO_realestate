import React, { useState, useRef, useEffect } from 'react';
import Transition from '../utils/Transition';

import FeaturesBg from '../images/CEO_section_image.png';
import FeaturesElement from '../images/features-element.png';

function FounderBroker() {


  return (
    <section className="relative">

      {/* Section background (needs .relative class on parent and next sibling elements) */}
      <div className="absolute inset-0 bg-white-100 pointer-events-none mb-16" aria-hidden="true"></div>
{/*       <div className="absolute left-0 right-0 m-auto w-px p-px h-20 bg-gray-200 transform -translate-y-1/2"></div>
 */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-12 md:pt-20">

          {/* Section header */}
          <div className="max-w-6xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="h6 mb-4" style={{fontSize:'50px'}}>Founder and Broker</h1>
            <p className="text-xl text-gray-600">O'Bryant began his real estate career in his early 20sas an investor in 2013. He later officially became a licensed agent in 2015after growing a passion for the importance of homeownership. Working as a solo agent and developer under a national brokerage, he quickly found success winning million-dollar producer awards year after year; it was apparent that the job was far from over. In 2019, O'Bryant founded Unique byDesign Realty. A new brokerage designed on the concept of creating more options for people to achieve homeownership in primarily nontraditional ways. At the same time, empowering others who want to follow a path of service and entrepreneurship as a "Unique Agent" under a new brokerage model that allows everyone to have a voice.</p>
                <img  src={FeaturesBg} width="1200" height="702" alt="Features bg"  />
          </div>

          {/* Section content */}
          <div className="md:grid md:grid-cols-12 md:gap-6">
          
            {/* Content */}
            <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-12 md:mt-6" data-aos="fade-right">
              <div className="md:pr-4 lg:pr-12 xl:pr-16 mb-8" >
{/*                 <h3 className="h3 mb-3">So, what is an NFT?</h3>
*/}             
                {/* <p style={{textAlign:'center'}}>O'Bryant began his real estate career in his early 20sas an investor in 2013. He later officially became a licensed agent in 2015after growing a passion for the importance of homeownership. Working as a solo agent and developer under a national brokerage, he quickly found success winning million-dollar producer awards year after year; it was apparent that the job was far from over. In 2019, O'Bryant founded Unique byDesign Realty. A new brokerage designed on the concept of creating more options for people to achieve homeownership in primarily nontraditional ways. At the same time, empowering others who want to follow a path of service and entrepreneurship as a "Unique Agent" under a new brokerage model that allows everyone to have a voice.</p>
                <img className="md:max-w-none mx-auto rounded" src={FeaturesBg} width="900" height="602" alt="Features bg"  />
 */}              </div>
            </div >

          </div >

        </div >
      </div >
    </section >
  );
}

export default FounderBroker;
