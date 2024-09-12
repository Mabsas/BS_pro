import React from 'react'
import { Link } from 'react-router-dom';


const Hero = () => {
    return (
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
                    className="text-yellow-100 text-lg lg:text-xl font-semibold border border-yellow-100 px-8 lg:px-12 py-3 hover:bg-yellow-100 hover:text-zinc-900 rounded-full transition duration-300 ease-in-out">
                        Discover Books
                    </Link>
                </div>
            </div>
            <div className="w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center">
                <img src="./hero2.png" alt="hero" />
            </div>
        </div>
    )
};

export default Hero