import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGripLines } from "react-icons/fa";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { ImSearch } from "react-icons/im";

const Navbar = () => {
    const links = [
        { title: "Home", link: "/" },
        { title: "All Books", link: "/all-books" },
        { title: "Cart", link: "/cart" },
        { title: "Profile", link: "/profile" },
        { title: "Admin Profile", link: "/profile" },
    ];
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);

    if (isLoggedIn === false) {
        links.splice(2, 3);  //cuts off cart profile & admin profile if not logged in
    }

    if (isLoggedIn === true && role === "user") {
        links.splice(4, 1);
    }
    if (isLoggedIn === true && role === "admin") {
        links.splice(2, 2);
    }

    const [MobileNav, setMobileNav] = useState("hidden");
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Fetch suggestions as the user types
    const handleSearchChange = async (e) => {
        const searchText = e.target.value;
        setQuery(searchText);
        if (searchText.length > 1) { // Fetch suggestions after 2 characters
            setLoading(true);
            try {
                const response = await axios.get(`https://bs-pro-api.vercel.app/api/v1/search-books`, {
                    params: { query: searchText }
                });
                setSuggestions(response.data.data);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            } finally {
                setLoading(false);
            }
        } else {
            setSuggestions([]);
        }
    };

    // Navigate to the results page when a suggestion is clicked
    const handleSuggestionClick = (suggestion) => {
        navigate(`/search-results?query=${suggestion}`);
        setQuery(''); // Clear search input after navigating
        setSuggestions([]);
    };

    return (
        <>
            <nav className="z-50 relative flex bg-gradient-to-b from-zinc-600 via-zinc-700 to-zinc-800 text-white px-8 py-4 items-center justify-between">
                <Link to="/" className="flex items-center">
                    <img
                        className="h-10 me-4"
                        src="https://cdn-icons-png.flaticon.com/512/10719/10719415.png"
                        alt="logo"
                    />
                    <h1 className="text-2xl font-semibold">BoOkshelf</h1>
                </Link>

                {/* Search bar */}
                <div className="relative mx-auto w-full max-w-lg md:max-w-2xl lg:max-w-3xl">
                    <div className="relative">
                        <input
                            type="text"
                            value={query}
                            onChange={handleSearchChange}
                            placeholder="Search by book or author"
                            className="w-full p-3 pl-12 pr-12 rounded-full border border-gray-600 bg-gradient-to-l from-zinc-800 via-zinc-400 to-zinc-800 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
                        />
                        <ImSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white" />
                    </div>

                    {loading && <div className="text-yellow-100 mt-1">Searching...</div>}

                    {suggestions.length > 0 && (
                        <ul className="absolute z-50 bg-zinc-800 border border-gray-600 w-full mt-1 rounded-lg max-h-60 overflow-y-auto shadow-lg transition-all duration-300 ease-in-out">
                            {suggestions.map((item, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleSuggestionClick(item.title)}
                                    className="p-2 cursor-pointer hover:bg-zinc-600 text-white transition-colors duration-200 ease-in-out"
                                >
                                    {item.title} by {item.author}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="nav-links-bookshelf block md:flex items-center gap-4">
                    <div className="hidden md:flex gap-4">
                        {links.map((items, i) => (
                            <div className="flex items-center" key={i}>
                                {items.title === "Profile" || items.title === "Admin Profile" ? (
                                    <Link
                                        to={items.link}
                                        className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                                    >
                                        {items.title}
                                    </Link>
                                ) : (
                                    <Link
                                        to={items.link}
                                        className="hover:text-blue-500 transition-all duration-300"
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

            {/* Mobile Navigation */}
            <div className={`${MobileNav} bg-zinc-800 fixed h-full w-full z-40 flex flex-col items-center justify-center top-0 left-0`}>
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
                {isLoggedIn === false && (
                    <>
                        <Link
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
