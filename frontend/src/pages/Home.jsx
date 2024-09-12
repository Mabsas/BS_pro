import React from 'react'
import Hero from '../components/Home/Hero';
import RecentlyAdded from '../components/Home/RecentlyAdded';

const Home = () => {

    return (
        <div className="bg-gradient-to-tl from-slate-800 to-zinc-800  text-white px-10 py-8">
            <Hero />
            <RecentlyAdded />
        </div>
    );
};

export default Home