import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGripLines } from "react-icons/fa";
import { useSelector } from 'react-redux';

const Navbar = () => {
    const links = [
        { title: "Home", link: "/" },
        { title: "All Books", link: "/all-books" },
        { title: "Cart", link: "/cart" },
        { title: "Profile", link: "/profile" },
    ];
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    if (isLoggedIn === false) {
        links.splice(2, 2);  //cuts off cart and profile if not logged in
    }
    const [MobileNav, setMobileNav] = useState("hidden");

    return (
        <>
            <nav className="z-50 relative flex bg-zinc-800 text-white px-8 py-4 items-center justify-between">
                <Link to="/" className="flex items-center">
                    <img
                        className="h-10 me-4"
                        src="https://cdn-icons-png.flaticon.com/512/10719/10719415.png"
                        alt="logo"
                    />
                    <h1 className="text-2xl font-semibold">BoOkshelf</h1>
                </Link>
                <div className="nav-links-bookshelf block md:flex items-center gap-4">
                    <div className="hidden md:flex gap-4">
                        {links.map((items, i) => (
                            <div className="flex items-center">
                                {items.title === "Profile" ? (<Link
                                    to={items.link}
                                    className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                                    key={i}
                                >
                                    {items.title}
                                </Link>) : (
                                    <Link
                                        to={items.link}
                                        className="hover:text-blue-500 transition-all duration-300"
                                        key={i}
                                    >
                                        {items.title}{" "}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                    {isLoggedIn === false && (
                        <div className="hidden md:flex gap-4">
                            <Link
                                to="/Login"
                                className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                            >
                                LogIn
                            </Link>
                            <Link
                                to="/SignUp"
                                className="px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                            >
                                SignUp
                            </Link>
                        </div>
                    )}
                    <button
                        className="text-white text-2xl hover:text-zinc-400 md:hidden"
                        onClick={() => setMobileNav(MobileNav === "hidden" ? "block" : "hidden")}
                    >
                        <FaGripLines />
                    </button>
                </div>
            </nav>
            <div
                className={`${MobileNav} bg-zinc-800 fixed h-full w-full z-40 flex flex-col items-center justify-center top-0 left-0`}
            >
                {links.map((items, i) => (
                    <Link
                        to={items.link}
                        className="text-white text-4xl mb-8 font-semibold hover:text-blue-500 transition-all duration-300"
                        key={i}
                        onClick={() => setMobileNav("hidden")}
                    >
                        {items.title}{" "}
                    </Link>
                ))}
                {isLoggedIn === false && (<>  <Link
                    to="/Login"
                    className="px-8 mb-8 text-3xl font-semibold py-2 border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-300"
                    onClick={() => setMobileNav("hidden")}
                >
                    LogIn
                </Link>
                    <Link
                        to="/SignUp"
                        className="px-8 mb-8 text-3xl font-semibold py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                        onClick={() => setMobileNav("hidden")}
                    >
                        SignUp
                    </Link>
                </>
                )}
            </div>
        </>
    );
};

export default Navbar;
