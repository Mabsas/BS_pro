import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ImSearch } from "react-icons/im";

const Hero = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Clear suggestions on unmount
        return () => {
            setSuggestions([]);
            setQuery('');
        };
    }, []);

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
        <div className="relative">
            {/* Search bar at the top center */}
            <div className="absolute top-0 left-0 right-0 flex justify-center mt-1">
                <div className="relative w-full max-w-lg md:max-w-2xl lg:max-w-3xl">
                    <div className="relative">
                        <input
                            type="text"
                            value={query}
                            onChange={handleSearchChange}
                            placeholder="Search by book or author"
                            className="w-full p-3 pl-12 pr-12 rounded-full border border-gray-600 bg-gradient-to-l from-slate-800 via-slate-400 to-slate-800 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
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
            </div>

            {/* Content of the Hero section */}
            <div className="h-[80vh] flex flex-col md:flex-row items-center justify-center">
                <div className="w-full mb-12 md:mb-0 lg:w-3/6 flex flex-col items-center lg:items-start justify-center ">
                    <h1 className="text-4xl font-semibold text-yellow-100 text-center lg:text-left">
                        Explore Your Next Great Read
                    </h1>
                    <p className="mt-4 text-xl text-zinc-300 text-center lg:text-left">
                        Enjoy a Rich Collection of Art Books, Mysteries, and Adventure Stories
                    </p>
                    <div className="mt-8">
                        <Link 
                            to="/all-books"
                            className="text-yellow-100 text-lg lg:text-xl font-semibold border border-yellow-100 px-8 lg:px-12 py-3 hover:bg-yellow-100 hover:text-zinc-900 rounded-full transition duration-300 ease-in-out"
                        >
                            Discover Books
                        </Link>
                    </div>
                </div>
                <div className="w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center">
                    <img src="./hero2.png" alt="hero" />
                </div>
            </div>
        </div>
    );
};

export default Hero;
