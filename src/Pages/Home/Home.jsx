import React, { useEffect, useState } from "react";
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
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLogin(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLogin(false);
        console.log("User logged out");
    };

    return (
        <div>
            <Navbar
                isLogin={isLogin}
                onLogout={handleLogout}
            // Pass other props as needed
            />            <Banner></Banner>
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