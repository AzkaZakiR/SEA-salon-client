import React from 'react';
import homebgimg from "../../images/mostafa-meraji-5npGPG0sSVk-unsplash.jpg";
import phone from '../../images/phone-28-24.png';
import { Link } from 'react-router-dom';
// import logo from '../../assets/logo.svg'; // Adjust path to your logo
import logo from '../../assets/react.svg'
const Banner = () => {
  return (
    <div className="bg-cover bg-center min-h-screen items-center justify-center flex mb-5" style={{ backgroundImage: `url(${homebgimg})` }}>
      <div className="max-w-5xl mx-auto px-6 py-12 text-white text-left">
        <h1 className="text-5xl items-center font-bold mb-4">SEA Salon And Barber <br /> </h1>
        <h1 className="text-2xl items-center font-bold mb-4">We Will Give You An <br /> Impeccable Look!</h1>
        <p className='text-slate-300 mb-8'>
          3891 Ranchview Dr. Richardson, <br />
          California 62639
        </p>
        <div className='flex items-center mb-8'>
          <img src={phone} alt="Phone Icon" className="w-6 h-6 mr-2" />
          <h1 className='text-3xl'>+1 234 567 890</h1>
        </div>
        <div className='mb-8'>
          <button className="btn btn-primary"><Link to="/service">BOOK NOW</Link></button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
