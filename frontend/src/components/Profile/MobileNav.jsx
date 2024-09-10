import React from 'react';
import { Link } from 'react-router-dom';

const MobileNav = () => {
    return (
        <div className="py-4 flex flex-row items-center">
            <Link
                to="/profile"
                className="text-gray-100 font-semibold w-full lg:hidden py-3 text-center hover:bg-gray-700 rounded transition-colors duration-300"
            >
                Favourites
            </Link>
            <Link
                to="/profile/orderHistory"
                className="text-gray-100 font-semibold w-full lg:hidden py-3 text-center hover:bg-gray-700 rounded transition-colors duration-300"
            >
                Order History
            </Link>
            <Link
                to="/profile/settings"
                className="text-gray-100 font-semibold w-full lg:hidden  py-3 text-center hover:bg-gray-700 rounded transition-colors duration-300"
            >
                Settings
            </Link>
        </div>
    );
};

export default MobileNav;
