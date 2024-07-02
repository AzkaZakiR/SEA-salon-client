import React from 'react';
import Banner from './Banner';
import ShortInfo from './ShortInfo';
import RedLine from './RedLine';
import Services from './Services';
import Reviews from './Review';
import Navbar from '../Components/Navbar';
import Login from '../Login';
// import Appointment from '../Appointment/Appointment/Appointment';
// import Blog from '../Blog/Blog';
// import About from '../About/About';
// import Gallery from '../Gallery/Gallery';

const Home = () => {
    return (
        <div>
            <Navbar />
            <Banner></Banner>
            <RedLine></RedLine>
            <ShortInfo></ShortInfo>
            <Services></Services>
            <Reviews></Reviews>
            {/* <Login></Login> */}
            {/* <Appointment></Appointment> */}
            {/* <Blog></Blog> */}
            {/* <About></About> */}
            {/* <Gallery></Gallery> */}
        </div>
    );
};

export default Home;