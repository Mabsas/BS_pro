import React from 'react'

const Hero = () => {
    return (
        <div className="h-[80vh] flex">
            <div className="w-full lg:w-3/6 flex flex-col items-center lg:items-start justify-center ">
                <h1 className="text-6xl font-semibold text-yellow-100 text-center lg:text-left">
                    Explore Your Next Great Read
                </h1>
                <p className="mt-4 text-xl text-zinc-300 text-center lg:text-left">
                    Enjoy a Rich Collection of Art Books, Mysteries, and Adventure Stories
                </p>
                <div className="mt-8">
                    <button className="text-yellow-100 text-xl lg:text-2xl font-semibold border border-yellow-100 px-10 py-2 hover:bg-zinc-800 rounded-full">
                        Discover Books
                    </button>
                </div>
            </div>
            <div className="w-full lg:w-3/6">
                <img src="./hero2.png" alt="hero" />
            </div>
        </div>
    )
};

export default Hero