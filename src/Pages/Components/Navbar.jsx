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
    isOTP = false,
}) => {
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
                { }
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
                        </NavbarItems>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-[#59575a] py-3 px-4 rounded-xl text-white flex gap-2 items-center hover:opacity-80 transition-all"
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
