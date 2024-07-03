import React from "react";
// import InputSearch from "./InputSearch";
import NavbarItems from "./NavbarItems";
import ListSvg from "./svg/ListSvg";
import BellSvg from "./svg/BellSvg";
import UserSvg from "./svg/UserSvg";
import { Link } from "react-router-dom";
import homebgimg from "../../images/mostafa-meraji-5npGPG0sSVk-unsplash.jpg";
import logo from "../../assets/logo.jpg"

const Navbar = ({
    isNotification,
    isAccount,
    isHistory,
    isLogin = false,
    isSearch,
    onLogout,
    isOTP
}) => {
    const handleLogout = () => {
        // Remove token from local storage
        localStorage.removeItem("token");
        // Call the onLogout function passed as a prop
        onLogout();
        // Redirect to the login page after logout
        history.push("/home");
    };
    return (
        <nav className="flex justify-between py-4 px-2 xl:px-28 md:items-center bg-slate-800">
            <div className="flex flex-1 flex-col md:flex-row md:ps-10 gap-3 md:gap-10 mt-3">
                <Link to="/">
                    <img
                        src={logo}
                        alt="navbar logo"
                        className="h-[60px]"
                    />
                </Link>
                {/* Add additional elements here if needed */}
            </div>
            {!isOTP && (
                <div>
                    {isLogin ? (
                        <NavbarItems>
                            <Link to="/riwayat-pesanan">
                                <ListSvg isActive={isHistory} />
                            </Link>
                            <Link to="/notification">
                                <BellSvg isActive={isNotification} />
                            </Link>
                            <Link to="/account">
                                <UserSvg isActive={isAccount} />
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-white bg-red-500 py-3 px-4 rounded-xl hover:opacity-80 transition-all"
                            >
                                Logout
                            </button>
                        </NavbarItems>

                    ) : (
                        <Link
                            to="/login"
                            className="bg-[#e4e2e4] py-3 px-4 rounded-xl text-black flex gap-2 items-center hover:opacity-80 transition-all"
                        >
                            Masuk
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
};
export default Navbar;
