import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack, IoMdCheckmarkCircle } from "react-icons/io";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import homebgimg from "../images/loginbg.png";
// import useSend from "../hooks/useSend";
import { motion } from "framer-motion";
import Cookies from "universal-cookie";
import axios from "axios";

const Login = () => {
    // const { loading, sendData } = useSend();
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(null);
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [login, setLogin] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        email: false,
        password: false,
    });
    const navigate = useNavigate();
    const cookies = new Cookies();

    useEffect(() => {
        const checkToken = localStorage.getItem("token");
        if (checkToken && checkToken !== "undefined") {
            navigate("/home");
        }
    }, []);

    useEffect(() => {
        if (isSuccess) {
            const timer = setTimeout(() => {
                navigate(`/`);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isSuccess, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/v1/auth/login", login);
            console.log(response.data.data.token)
            if (response.data && response.data.data.token) {
                console.log("Masuk setting cookie")
                cookies.set("token", response.data.token, {
                    path: "/home",
                    expires: new Date(Date.now() + 43200000),
                });
                localStorage.setItem("token", response.data.data.token);

                setIsSuccess(true);
                setMessage(response.data.message);
                setErrors({ email: false, password: false });
            } else {
                setIsSuccess(false);
                setMessage(response.data.message);
                if (response.status === 401) {
                    setErrors({ email: false, password: true });
                } else if (response.status === 400) {
                    setErrors({ email: true, password: false });
                } else {
                    setErrors({ email: true, password: true });
                }
            }
        } catch (err) {
            console.error("Login error:", err);
            navigate("/error");
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setLogin((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row overflow-hidden">
            <motion.div
                initial={{ opacity: 0, x: -75 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.75, delay: 0.25 }}
                className="hidden md:block w-1/2 h-screen"
            >
                <img
                    src={homebgimg}
                    alt="Auth Background"
                    className="w-full h-full object-cover"
                />
            </motion.div>
            <div className="w-full md:w-1/2 flex items-center justify-center bg-slate-800 md:from-white md:to-white h-screen">
                <motion.form
                    initial={{ opacity: 0, x: 75 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className="space-y-4 md:space-y-6 w-full max-w-md p-6 py-10 bg-white md:bg-transparent rounded-md md:rounded-none shadow-md md:shadow-none"
                    onSubmit={handleSubmit}
                    method="POST"
                >
                    <motion.div
                        initial={{ opacity: 0, x: 75 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.75, delay: 0.25 }}
                    >
                        <h1 className="text-xl font-bold mb-5 leading-tight tracking-tight flex gap-3 text-white md:text-2xl">
                            <Link
                                to="/home"
                                className="bg-[#070608] rounded-full p-1 text-white hover:bg-[#5f79a3]/90"
                            >
                                <IoMdArrowRoundBack />
                            </Link>
                            Masuk
                        </h1>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 75 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.75 }}
                    >
                        <label
                            htmlFor="email"
                            className="block mb-2 text-xs font-normal text-white"
                        >
                            Email/No Telepon
                        </label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            className={`bg-gray-50 border ${errors.email ? "border-red-500" : "border-gray-300"
                                } text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:border-cyan-500`}
                            placeholder="Contoh: johndoe@gmail.com"
                            value={login.email}
                            onChange={handleChange}
                            required
                            autoComplete="email"
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 75 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 1 }}
                        className="relative"
                    >
                        <label
                            htmlFor="password"
                            className="flex justify-between mb-2 text-xs text-white"
                        >
                            <p className="font-normal">Password</p>
                            <Link to="/send-email" className="text-[#020202] font-medium">
                                Lupa Kata Sandi
                            </Link>
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id="password"
                            placeholder="Masukkan password"
                            className={`bg-gray-50 border ${errors.password ? "border-red-500" : "border-gray-300"
                                } text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:border-cyan-500`}
                            value={login.password}
                            onChange={handleChange}
                            required
                            autoComplete="current-password"
                        />
                        <button
                            type="button"
                            className="absolute top-1/2 transform right-3 text-2xl text-gray-600"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                        </button>
                    </motion.div>
                    <motion.button
                        initial={{ opacity: 0, x: 75 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 1.25 }}
                        type="submit"
                        disabled={loading || isSuccess}
                        className={`w-full text-black bg-[#d7d6d8] hover:bg-[#757475]/90 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center ${loading || isSuccess ? "cursor-not-allowed" : ""
                            }`}
                    >
                        {loading ? "Loading..." : "Masuk"}
                    </motion.button>
                    <motion.p
                        initial={{ opacity: 0, x: 75 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 1.5 }}
                        className="text-sm font-light text-white text-center"
                    >
                        Belum punya akun?{" "}
                        <Link
                            to="/register"
                            className="font-medium text-[#f5f5f5] hover:underline"
                        >
                            Daftar di sini
                        </Link>
                    </motion.p>
                    {isSuccess !== null && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.25 }}
                            className="flex justify-center mt-4"
                        >
                            <div
                                className={`${isSuccess ? "bg-[#73CA5C]" : "bg-[#FF0000]"
                                    } text-center text-white text-sm font-medium px-6 py-4 rounded-xl inline-block`}
                            >
                                <h1>{message}</h1>
                            </div>
                        </motion.div>
                    )}
                </motion.form>
            </div>
        </div>
    );
};

export default Login;
