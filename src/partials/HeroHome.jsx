import React, {useState} from 'react';

import Modal from '../utils/Modal';

import HeroImage from '../images/hero-image.png';
import BannerIcon0 from '../images/space.png';
import BannerIcon1 from '../images/banner_icon1.png';
import BannerIcon2 from '../images/banner_icon2.png';
import BannerIcon3 from '../images/banner_icon3.png';
import Background from '../images/background.png';
import { Link } from 'react-router-dom';
 
import '../css/roadmap.css';

import large from '../images/homeimage.png';
import medium from '../images/homeimage2.png';
import small from '../images/homeimage3.png';
import Menuimage from '../images/menuimg.png';
import OriLogo from '../images/original_logo.png';

function myFunction() {
  var x = document.getElementById("navbar2");
  if (x.className === "mytopnav") {
    x.className += "responsive";
/*     alert(x.className);
 */  } else {
    x.className = "mytopnav";
/*     alert(x.className);
 */  }
}

function HeroHome() {

  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <section id="back1" className="relative" >

      <div id="back2" className="max-w-6xl mx-auto px-4 sm:px-6" >

      <div id="headerdiv" className="pt-6 pb-0 md:pt-6 md:pb-0" >
          
          <div id = "menudiv">
            <img src={Menuimage} width={'50px'} onClick={myFunction}></img>
          </div>

            {/* Social links */}
          <ul className=" flex mb-4 md:order-1 md:ml-4 md:mb-0 justify-end" >
            <li >
              <Link to="#" className="flex justify-center items-center text-gray-600 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out" aria-label="Twitter" style={{backgroundColor:'#ffffff'}}>
                <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 11.5c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4 0 1.6 1.1 2.9 2.6 3.2-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H8c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4c.7-.5 1.3-1.1 1.7-1.8z" />
                </svg>
              </Link>
            </li>
            <li className="ml-4">
              <Link to="#" className="flex justify-center items-center text-gray-600 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out" aria-label="Github" style={{backgroundColor:'#ffffff'}}>
                <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 8.2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V22c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8z" />
                </svg>
              </Link>
            </li>
            <li className="ml-4">
              <Link to="#" className="flex justify-center items-center text-gray-600 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out" aria-label="Facebook" style={{backgroundColor:'#ffffff'}}>
                <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.023 24L14 17h-3v-3h3v-2c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V14H21l-1 3h-2.72v7h-3.257z" />
                </svg>
              </Link>
            </li>
            {/* <li className="ml-4">
              <Link to="#" className="flex justify-center items-center text-gray-600 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out" aria-label="Facebook" >
                <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.023 24L14 17h-3v-3h3v-2c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V14H21l-1 3h-2.72v7h-3.257z" />
                </svg>
              </Link>
            </li> */}
          </ul>
          </div>
          <div id = "navbar" class="mytopnav">
            <div class="header_menu header_menu1">
                <ul>
                  <li><a href="#home">Home</a></li>
                  <li><a href="#intro">What is NFT</a></li>
                  <li><a href="#benefits">Benefits & Utilities</a></li>
                </ul>
            </div>
            <div class="header_logo">         
                <a href="index.html" class="heder_logo">
                  <img src={OriLogo} alt="logo"/>
                </a>
            </div>
            <div class="header_menu header_menu2">
                <ul>
                  <li><a href="#roadmap">Roadmap</a></li>
                  <li><a href="#team">Founder & Broker</a></li>
                  <li><a href="#faq">Members</a></li>
                </ul>
            </div>
          </div>
          <div>
            <div  id = "navbar2" class="mytopnav">
                <ul>
                  <li class="navbar2li"><a href="#home">Home</a></li>
                  <li class="navbar2li"><a href="#intro">What is NFT</a></li>
                  <li class="navbar2li"><a href="#benefits">Benefits & Utilities</a></li>
                  <li class="navbar2li"><a href="#roadmap">Roadmap</a></li>
                  <li class="navbar2li"><a href="#team">Founder & Broker</a></li>
                  <li class="navbar2li"><a href="#faq">Members</a></li>
                </ul>
            </div>
          </div>
          {/* <div id="normalnav" style={ {border: '2px solid gray', 'borderRadius':'50px'}}>
            <ul className="flex justify-center items-center mb-4 md:order-1 md:ml-4 md:mb-0">
              <li>
                <Link to="#" className="flex justify-center items-center text-gray-600 hover:text-gray-900 bg-none hover:bg-white-100  transition duration-150 ease-in-out" aria-label="Twitter">
                  <p style={{margin:30}}>Home</p>
                </Link>
              </li>
              <li>
                <Link to="#" className="flex justify-center items-center text-gray-600 hover:text-gray-900 bg-none hover:bg-white-100  transition duration-150 ease-in-out" aria-label="Twitter">
                  <p style={{margin:30}}>What is the NFT</p>
                </Link>
              </li>
              <li>
                <Link to="#" className="flex justify-center items-center text-gray-600 hover:text-gray-900 bg-none hover:bg-white-100  transition duration-150 ease-in-out" aria-label="Twitter">
                  <p style={{margin:30}}>General Benefits & Utilities of NFT</p>
                </Link>
              </li>
              <li>
                <Link to="#" className="flex justify-center items-center text-gray-600 hover:text-gray-900 bg-none hover:bg-white-100  transition duration-150 ease-in-out" aria-label="Twitter">
                  <p style={{margin:30}}>Roapmap</p>
                </Link>
              </li>
              <li>
                <Link to="#" className="flex justify-center items-center text-gray-600 hover:text-gray-900 bg-none hover:bg-white-100  transition duration-150 ease-in-out" aria-label="Twitter">
                  <p style={{margin:30}}>Founder and Broker</p>
                </Link>
              </li>
              <li>
                <Link to="#" className="flex justify-center items-center text-gray-600 hover:text-gray-900 bg-none hover:bg-white-100  transition duration-150 ease-in-out" aria-label="Twitter">
                  <p style={{margin:30}}>Members</p>
                </Link>
              </li>
            </ul>
          </div> */}

        {/* Hero content */}
        <div className="pt-6 pb-12 md:pt-12 md:pb-20" >

          {/* Section header */}
          <div className="text-center pb-12 md:pb-16" /* style={{ backgroundImage: `url(${Background})` }} */>
            <p className="text-xl text-black mb-8" data-aos="zoom-y-out" data-aos-delay="150">READY TO TAKE OVER THE REAL ESTATE BUSINESS AND NFT SPACE</p>
            <h1 id="title" className="text-5xl md:text-5xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out" >Join Unique By Design Realty 3.0 <br/> <span id="title2" className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">and become a “Unique” Agent</span></h1>
{/*             <p className="text-xl text-gray-600 mb-8" data-aos="zoom-y-out" data-aos-delay="150">On our 3rd year anniversary in the real estate business, we are commemorating by using 3rd web technology</p>
 */}            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-black mb-8" data-aos="zoom-y-out" data-aos-delay="150">On our 3rd year anniversary in the real estate business, we are commemorating by using 3rd web technology</p>
              {/* <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center" data-aos="zoom-y-out" data-aos-delay="300">
                <div>
                  <a className="btn text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0" href="#0">Start free trial</a>
                </div>
                <div>
                  <a className="btn text-white bg-gray-900 hover:bg-gray-800 w-full sm:w-auto sm:ml-4" href="#0">Learn more</a>
                </div>
              </div> */}
              
            </div>
          </div>

          {/* Hero image */}
          <div>
            <div className="relative flex justify-center mb-8" data-aos="zoom-y-out" data-aos-delay="450">
              <div className="flex flex-col justify-center">
                {/* <img className="mx-auto" src={BannerIcon0} width="400" height="400" alt="Hero" />
                <img className="mx-auto" src={BannerIcon1} alt="Hero" style={{width: 450, height: 250, position: 'absolute', top: 0, left: 0}} data-aos="fade-down-right" data-aos-delay="450"/>
                <img className="mx-auto" src={BannerIcon2} alt="Hero" style={{width: 450, height: 250, position: 'absolute', top: 0, left: 700}} data-aos="fade-down-left" data-aos-delay="550"/>
                <img className="mx-auto" src={BannerIcon3} alt="Hero" style={{width: 800, height: 350, position: 'absolute', top: 150, left: 150}} data-aos="fade-up-left" data-aos-delay="650"/> */}

                <div id="ghi_small">
                  <img src={small}  />
                </div>
                <div id="ghi_medium">
                  <img src={medium}  />
                </div>
                <div id="ghi_large">
                  <img src={large}  />
                </div>

                {/* <svg className="absolute inset-0 max-w-full mx-auto md:max-w-none h-auto" width="768" height="432" viewBox="0 0 768 432" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                  <defs>
                    <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="hero-ill-a">
                      <stop stopColor="#FFF" offset="0%" />
                      <stop stopColor="#EAEAEA" offset="77.402%" />
                      <stop stopColor="#DFDFDF" offset="100%" />
                    </linearGradient>
                    <linearGradient x1="50%" y1="0%" x2="50%" y2="99.24%" id="hero-ill-b">
                      <stop stopColor="#FFF" offset="0%" />
                      <stop stopColor="#EAEAEA" offset="48.57%" />
                      <stop stopColor="#DFDFDF" stopOpacity="0" offset="100%" />
                    </linearGradient>
                    <radialGradient cx="21.152%" cy="86.063%" fx="21.152%" fy="86.063%" r="79.941%" id="hero-ill-e">
                      <stop stopColor="#4FD1C5" offset="0%" />
                      <stop stopColor="#81E6D9" offset="25.871%" />
                      <stop stopColor="#338CF5" offset="100%" />
                    </radialGradient>
                    <circle id="hero-ill-d" cx="384" cy="216" r="64" />
                  </defs>
                  <g fill="none" fillRule="evenodd">
                    <circle fillOpacity=".04" fill="url(#hero-ill-a)" cx="384" cy="216" r="128" />
                    <circle fillOpacity=".16" fill="url(#hero-ill-b)" cx="384" cy="216" r="96" />
                    <g fillRule="nonzero">
                      <use fill="#000" xlinkHref="#hero-ill-d" />
                      <use fill="url(#hero-ill-e)" xlinkHref="#hero-ill-d" />
                    </g>
                  </g>
                </svg> */}
              </div>
              {/* <button className="absolute top-full flex items-center transform -translate-y-1/2 bg-white rounded-full font-medium group p-4 shadow-lg" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setVideoModalOpen(true); }} aria-controls="modal">
                <svg className="w-6 h-6 fill-current text-gray-400 group-hover:text-blue-600 flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0 2C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12z" />
                  <path d="M10 17l6-5-6-5z" />
                </svg>
                <span className="ml-3">Watch the full video (2 min)</span>
              </button> */}
            </div>

            {/* Modal */}
            <Modal id="modal" ariaLabel="modal-headline" show={videoModalOpen} handleClose={() => setVideoModalOpen(false)}>
              <div className="relative pb-9/16">
                <iframe className="absolute w-full h-full" src="https://player.vimeo.com/video/174002812" title="Video" allowFullScreen></iframe>
              </div>
            </Modal>

          </div>

        </div>

      </div>
    </section>
  );
}

export default HeroHome;

